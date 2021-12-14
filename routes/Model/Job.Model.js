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

function updateJob(job){
    return JobModel.findOneAndUpdate({id: job._id},{
        title: job.title,
        companyName: job.companyName,
        location: job.location,
        description: job.description,
        employerMailContact: job.employerMailContact,
        companyWebsite: job.companyWebsite,
        postingDate: job.postingDate,
        createdBy: job.createdBy
    })
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
    updateJob,
    findAllJobs,
    findJobLikeTitle,
    findJobByTitle,
    findJobById,
    findJobByLocation
}