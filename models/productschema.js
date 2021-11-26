const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

var productSchema = new Schema({
    
    itemTitle: { type: String },
    frontShape: { type: String, },
    closure: { type: String, },
    material: { type: String, },
    mainimage: { type: String, },
    image1: { type: String, },
    image2: { type: String, },
    image3: { type: String, },
    image4: { type: String, },
    desc: { type: String, },
    madein: { type: String, },
    bulletone: { type: String, },
    bullettwo: { type: String, },
    bulletthree: { type: String, },
    price: { type: Currency, min: 0 },
    shouldbecustomized: { type: Boolean, default: false, },
    qty: { type: Number }

},
    {
        timestamps: true
    });

module.exports = mongoose.model('Product', productSchema);