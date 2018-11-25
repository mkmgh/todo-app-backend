const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let userSchema = new Schema({
  userId: {
    type: String,
    default: '',
    index: true,
    unique: true
  },
  firstName: {
    type: String,
    default: ''
  },
  lastName: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    default: 'passskdajakdjkadsj'
  },
  email: {
    type: String,
    default: ''
  },
  mobileNumber: {
    type: String,
    default: 0
  },
  country:{
    type: String,
    default: ''
  },

  userVerificationStatus:{
    type: Boolean,
    default: false
  },

  
  requests :[],
  
  friends:[],

  createdOn :{
    type:Date,
    default: new Date()
  }


})


mongoose.model('UserModel', userSchema);