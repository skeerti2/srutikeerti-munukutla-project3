require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session')
const job = require('./routes/job.js');
const user = require('./routes/user.js')
const authRouter = require('./routes/authRouter.js')
const MongoStore = require('connect-mongo')
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer')
const storage = multer.memoryStorage();
const upload = multer({storage : storage})

const cookieParser = require('cookie-parser');

//const User = require('./routes/Schema/User.Schema.js')

// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
const mongoDBEndpoint = process.env.MONGODB_URI;

const mongoConnect = mongoose.connect(mongoDBEndpoint, {useNewUrlParser: true});
// mongoConnect.on('connect', console.log("connected to database"))

const mongoDB = mongoose.connection;

mongoDB.on('error', console.error.bind(console, 'Error connecting to the database'));

app.use(session({
    secret: "SUPER_SECRET_KEY",
    cookie:{secure: false, expires: 600000},
    store: MongoStore.create({mongoUrl: mongoDBEndpoint}),
}))


app.use(cors());
app.use(cookieParser());

//helps to modify the request body
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/job', job)
app.use('/auth', authRouter)
app.use('/api/user', user)

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', function (req, res) {
    console.log("received request");
    res.sendFile(path.join(__dirname, "build", "index.html"));
    // res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});