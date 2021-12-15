const mongoose = require('mongoose');
const UserSchema = require('../Schema/User.Schema').UserSchema;

const UserModel = mongoose.model("User", UserSchema);

function createUser(user){
    return UserModel.create(user);
}

function findAllUsers(){
    return UserModel.find().exec();
}

function findByUsername(username){
    return UserModel.findOne({username: username});
}
function deleteUser(user){
    return UserModel.deleteOne(user)
}

function updateUserFavorites(favoriteDetails){
    return UserModel.updateOne(
        {username: favoriteDetails.username},
        {$push : {favoriteJobs: favoriteDetails.jobDetails._id}})
}

function unFavoriteJobOfUser(unfavoriteJobDetails){
    console.log(unfavoriteJobDetails)
    return UserModel.updateOne({username: unfavoriteJobDetails.username},
        {$pullAll: {
            favoriteJobs: [unfavoriteJobDetails.jobId]
        }})
}

module.exports = {
    createUser,
    findAllUsers,
    findByUsername,
    updateUserFavorites,
    unFavoriteJobOfUser,
    deleteUser
}