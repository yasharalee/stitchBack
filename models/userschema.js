const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    
    firstname: {
        type: String,
        sparse: true
    },
    lastname: {
        type: String,
        sparse: true
    },
    
    admin: {
        type: Boolean,
        default: false
    },
    avatar: {
        type: String,
        sparse: true
    },
    email: {
        type: String
    }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);