const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const designSizes = new Schema({
  
    
    design: {
        type:String
    },
    placement: {
        type: String
    },
    height: {
        type:Number
    },
    width: {
        type:Number
    },
    proportionate: {
        type: Boolean,
        default:true
    },

})



const orderedItemsSchema = new Schema({
  
        itemTitle:  {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product'
        },
        qty:{
            type: Number,
        },
        design: {
            type:[designSizes]
        },
        instruction: {
            type: String
        }
   
})


const orderSchema = new Schema({

    orderNumber: {
        type: Number,
        default:111111
    },
    date: {
        type: Date,
        default:Date.now
    },
    clientName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    totalValue: {
        type: Number
    },
    // orderedItems: [orderedItems],
    orderedItems: {
        type: [orderedItemsSchema]
    },
    
    shippingAddress: {
        street1: {
            type:String
        },
        street2: {
            type:String
        },
        city: {
            type:String
        },
        state: {
            type:String
        },
        zipcode: {
            type:Number
        }
    },
    added_desc: {
        type: String
    }
    
    
    },
        {
    timestamps: true
});

orderSchema.plugin(AutoIncrement, {inc_field: 'orderNumber'})

module.exports = mongoose.model('Order', orderSchema);