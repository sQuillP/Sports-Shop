const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required:[true, "Please provide a name"]
    },
    description:{
        type: String,
        required:[true, "Please provide a description"]
    },
    price:{
        type:Number,
        required:[true,'Product must have a price'],
    },
    image: {
        type:String,
        required:[true, "Must provide image for product"]
    },
    sizes: [{type:String, required:[true, 'Please add sizes']}],
    colors:[{type: String, required:[true, 'Please add color codes']}],
    inventoryCount: {
        type:Number,
        required:[true,`Please provide an available quantity`]
    },
    ratings: {
        "1":{
            type:Number,
            default: 0
        },
        "2":{
            type:Number,
            default: 0
        },
        "3":{
            type:Number,
            default: 0
        },
        "4":{
            type:Number,
            default: 0
        },
        "5":{
            type:Number,
            default: 0
        }
    }
});





const ItemModel = mongoose.model('Item', ItemSchema);

module.exports = ItemModel;