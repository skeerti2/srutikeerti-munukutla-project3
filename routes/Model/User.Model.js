const mongoose = require('mongoose');
const UserSchema = require('../Schema/User.Schema').UserSchema;

const UserModel = mongoose.model("User", UserSchema);

function createUser(user){
    return UserModel.create(user);
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

module.exports = {
    createUser,
    findByUsername,
    updateUserFavorites,
    deleteUser
}