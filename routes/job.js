const express = require('express');
const router = express.Router();
const JobModelAccessor = require('./Model/Job.Model');


router.post('/createjob', (req, res) => {
    //TODO: Add validation
    console.log("req received")
    return JobModelAccessor.createJob(req.body)
    .then(jobresponse => res.status(200).send(jobresponse))
    .catch(error => res.status(400).send(error))
})

router.get('/getAllJobs', (req, res) => {
    // const newJob = new JobModel({title: req.body.title, }
    return JobModelAccessor.findAllJobs()
    .then(jobresponse => res.status(200).send(jobresponse))
    .catch(error => res.status(400).send(error))
})

router.get('/getJobByTitle/:jobTitle', (req, res) => {
    console.log("get request received")
    const jobTitle = req.params.jobTitle;
    return JobModelAccessor.findJobByTitle(jobTitle)
    .then(jobresponse => res.status(200).send(jobresponse))
    .catch(error => res.status(400).send(error))
})

module.exports = router;