const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    avatar: {
        type: String,
    },
    personId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    firstname: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    lastname: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    phone: {
        type: Number
    },
    email: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    company_name: {
        type: String
    },
    designs: [{
        type: [String]
    }],
    pastorders: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Order'
    },
    msg_from_ad: {
        type: String
    },
    preffered_contact: {
        type: String,
        default:'email'
    }
    
});

module.exports = mongoose.model('Profile', profileSchema);