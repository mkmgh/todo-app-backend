const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let subItemHistorySchema = new Schema({

    itemId: {
        type: String,
        default: '',
    },

    subItemId: {
        type: String,
        default: ''
        //index: true,
        //unique: true
    },
    subItemName: {
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


mongoose.model('SubItemHistoryModel', subItemHistorySchema);