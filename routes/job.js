const express = require('express');
const router = express.Router();
const JobModelAccessor = require('./Model/Job.Model');
const UserModelAccessor = require('./Model/User.Model');



router.post('/createjob', (req, res) => {
    //TODO: Add validation
    console.log("req received")
    console.log(req.body)
    return JobModelAccessor.createJob(req.body)
    .then(jobresponse => res.status(200).send(jobresponse))
    .catch(error => {
        console.log(error)
        res.status(400).send(error)
    })
})

router.put('/updatejob', (req, res) => {
    //TODO: Add validation
    console.log("update req received")
    console.log(req.body)
    return JobModelAccessor.updateJob(req.body)
    .then(jobresponse => res.status(200).send(jobresponse))
    .catch(error => {
        console.log(error)
        res.status(400).send(error)
    })
})


router.get('/getAllJobs', (req, res) => {
    // const newJob = new JobModel({title: req.body.title, }
    console.log(req.session)
    return JobModelAccessor.findAllJobs()
    .then(jobresponse => res.status(200).send(jobresponse))
    .catch(error => res.status(400).send(error))
})

router.get('/getJobLikeTitle/:jobTitle', (req, res) => {
    console.log("get request received")
    const jobTitle = req.params.jobTitle;
    return JobModelAccessor.findJobLikeTitle(jobTitle)
    .then(jobresponse => {
        res.status(200).send(jobresponse)
    })
    .catch(error => res.status(400).send(error))
})

router.get('/getJobByTitle/:jobTitle', (req, res) => {
    console.log("get request received")
    const jobTitle = req.params.jobTitle;
    return JobModelAccessor.findJobByTitle(jobTitle)
    .then(jobresponse => {
        res.status(200).send(jobresponse)
    })
    .catch(error => res.status(400).send(error))
})

router.get('/getJobById/:jobId', (req, res) => {
    console.log("get request for job id received")
    const jobId = req.params.jobId;
    return JobModelAccessor.findJobById(jobId)
    .then(jobresponse => {
        console.log(jobresponse)
        res.status(200).send(jobresponse)
    })
    .catch(error => res.status(400).send(error))
})

router.delete('/deleteByjobId/:jobId', (req, res) => {
    console.log("get request for job id received")
    const jobId = req.params.jobId;
    return JobModelAccessor.deleteJob(jobId)
    .then(jobresponse => {
        console.log(jobresponse)
        UserModelAccessor.findAllUsers()
        .then(allUsersResponse => { 
                console.log("all users being displayed")
                allUsersResponse.map(user => {
                    const jobDetails = {username: user.username, jobId: jobId}
                    UserModelAccessor.unFavoriteJobOfUser(jobDetails)
                    .then(unFavoritedResponse => {
                        console.log(unFavoritedResponse)
                    })
                    .catch(error => console.log(error))
                })
            res.status(200).send(jobresponse)
        })
        .catch(error => res.status(402).send("Could not get all users"));
        
    })
    .catch(error => res.status(400).send(error))
})
module.exports = router;