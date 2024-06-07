const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    min:2,
    max:100,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max:50,
  },
  role: {
    type: String,
    enum: ['admin', 'manager', 'employee'],
    required: true
  },
  password: {
    type: String,
    required: true,
    min: 6
  },
  position: { 
    type: String,
    required: true,
    min: 3
 },
  department: {
     type: String,
     required: true,
     min: 3
  },
  phone_number:  {
    type: Number,
    required: true,
    min: 10
 },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);
