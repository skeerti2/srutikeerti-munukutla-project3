require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session')
const job = require('./routes/job.js');
const authRouter = require('./routes/authRouter.js')
const MongoStore = require('connect-mongo')
const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');

//const User = require('./routes/Schema/User.Schema.js')

// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
const mongoDBEndpoint = process.env.MONGODB_URI || 'mongodb://127.0.0.1/jobportalapp_database';

const mongoConnect = mongoose.connect(mongoDBEndpoint, {useNewUrlParser: true});
// mongoConnect.on('connect', console.log("connected to database"))

const mongoDB = mongoose.connection;

mongoDB.on('error', console.error.bind(console, 'Error connecting to the database'));

app.use(session({
    secret: "SUPER_SECRET_KEY",
    cookie:{secure: false, expires: 60000},
    store: MongoStore.create({mongoUrl: mongoDBEndpoint}),
}))


app.use(cors());
app.use(cookieParser());

//helps to modify the request body
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/job', job)
app.use('/auth', authRouter)
//app.use('/api/users', User)
app.listen(8000, function(){
    console.log("listening")
});