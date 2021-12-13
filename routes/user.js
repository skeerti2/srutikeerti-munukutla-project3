const express = require('express');
const router = express.Router();
const UserModelAccessor = require('./Model/User.Model');


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
module.exports = router;