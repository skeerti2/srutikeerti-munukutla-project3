const mongoose = require('mongoose');
let Schema = mongoose.Schema;

exports.JobSchema = new Schema({
    title : {
        type: String
    },
    companyName : {
        type: String
    },
    location : {
        type: String
    },
	description : {
        type: String
    },
    employerMailContact : {
        type: String
    },
    companyWebsite : {
        type: String
    },
    postingDate : {
        type: Date,
        default: Date.now()
    }
},
{collection: 'jobs'});
