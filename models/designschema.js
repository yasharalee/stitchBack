const mongoose = require('mongoose');
const Schema = mongoose.Schema;






const designSchema = new Schema({

    whosDesign: {
        type: String
    },
    designTitle: {
        type: String
    },
    data: Buffer,
    contentType:String

});


module.exports = mongoose.model('Design', designSchema);