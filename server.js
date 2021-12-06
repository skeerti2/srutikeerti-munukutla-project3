const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const job = require('./routes/job.js')
//const User = require('./routes/Schema/User.Schema.js')


const mongoDBEndpoint = process.env.MONGODB_URI || 'mongodb://127.0.0.1/jobportalapp_database';

const mongoConnect = mongoose.connect(mongoDBEndpoint, {useNewUrlParser: true});

const mongoDB = mongoose.connection;

mongoDB.on('error', console.error.bind(console, 'Error connecting to the database'));

app.use(cors())
//helps to modify the request body
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/job', job)
//app.use('/api/users', User)
app.listen(8000, function(){
    console.log("listening")
});