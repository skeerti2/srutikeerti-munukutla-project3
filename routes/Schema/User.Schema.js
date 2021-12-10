const mongoose = require('mongoose');
let Schema = mongoose.Schema;

exports.UserSchema = new Schema({
    username : {
        type: String
    },
    password : {
        type: String
    },
    email : {
        type: String
    }
    // },
    // favoriteJobs : [
    //     Schema.Types.ObjectId
    // ]
});

