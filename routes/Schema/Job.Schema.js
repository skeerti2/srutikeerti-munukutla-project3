const mongoose = require('mongoose');
let Schema = mongoose.Schema;

exports.JobSchema = new Schema({
    title : {
        type: String,
        required: true
    },
    companyName : {
        type: String,
        required: true
    },
    location : {
        type: String,
        required: true

    },
	description : {
        type: String,
        required: true
    },
    employerMailContact : {
        type: String,
        required: true
    },
    companyWebsite : {
        type: String,
        default: ''
    },
    postingDate : {
        type: Date,
        default: Date.now()
    },
    createdBy : {
        type: String,
    } 
},
{collection: 'jobs'});
