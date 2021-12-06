const mongoose = require('mongoose');
let JobSchema = require('../Schema/Job.Schema').JobSchema

const JobModel = mongoose.model("Job", JobSchema);

function createJob(job){
    return JobModel.create(job)
}

function findAllJobs(){
    return JobModel.find({}).exec();
}

function findJobByTitle(title){
    return JobModel.find({title: title}).exec();
}

function findJobByLocation(location){
    return JobModel.find({location: location}).exec();
}

module.exports= {
    createJob,
    findAllJobs,
    findJobByTitle,
    findJobByLocation
}