const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let itemSchema = new Schema({

    listId: {
        type: String,
        default: '',
    },

    itemId: {
        type: String,
        default: ''
        //index: true,
        //unique: true
    },
    itemName: {
        type: String,
        default: ''
    },

    createdOn: {
        type: Date,
        default: new Date()
    },
    modifiedOn: {
        type: Date,
        default: new Date()
    },

    isDone:{
        type : Boolean,
        default:false        
    }


})


mongoose.model('ItemModel', itemSchema);