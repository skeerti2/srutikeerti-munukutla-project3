const express = require('express');
const router = express.Router();
const UserModelAccessor = require('./Model/User.Model');
const JobModelAccessor = require('./Model/Job.Model');



router.put('/addToUserFavourite', (req, res) => {
    //TODO: Add validation
    console.log("req received")
    console.log(req.body)
    return UserModelAccessor.updateUserFavorites(req.body)
    .then(userResponse => res.status(200).send(userResponse))
    .catch(error => {
        console.log(error)
        res.status(400).send(error)
    })
})

router.get('/getAllFavorites/:username', (req, res) => {
    console.log("request for user favorites made")
    const username = req.params.username
    console.log("username is from server", username)
    return UserModelAccessor.findByUsername(username)
    .populate('favoriteJobs')
    .then(userObject => {
        res.status(200).send(userObject)
    })
    .catch(error => {
        console.log(error)
        res.status(400).send(error)
    })
})

router.delete('/removeJobFromFavorites/:unfavoriteJobId', (req, res) => {
    console.log(req.session)
    console.log("request to remove favorites received"+ " name: " + req.session.username + " " +req.params.unfavoriteJobId)
    const unfavoriteJobDetails= {username: req.session.username, jobId : req.params.unfavoriteJobId}
    return UserModelAccessor.unFavoriteJobOfUser(unfavoriteJobDetails)
    .then(response => {
        console.log(response)
        res.status(200).send(response)
    })
    .catch(error => console.log(error))
})


module.exports = router;