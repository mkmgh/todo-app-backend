const mongoose = require('mongoose'),
Schema = mongoose.Schema;

let itemHistorySchema = new Schema({

    listId: {
        type: String,
        default: '',
    },

    itemId: {
        type: String,
        default: ''
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
    },

    operationName:{
        type: String,
        default: ''
    }


})


mongoose.model('ItemHistoryModel', itemHistorySchema);