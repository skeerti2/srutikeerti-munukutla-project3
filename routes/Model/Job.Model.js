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


function findJobById(id){
    return JobModel.findOne({_id: id}).exec();
}

function findJobByLocation(location){
    return JobModel.find({location: location}).exec();
}

function findJobLikeTitle(title){
    console.log("query string " + '^'+title);
    return JobModel.find({title: {'$regex': '^'+title, '$options': 'i'}});
}
module.exports= {
    createJob,
    findAllJobs,
    findJobLikeTitle,
    findJobByTitle,
    findJobById,
    findJobByLocation
}