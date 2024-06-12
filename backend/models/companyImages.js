const mongoose = require('mongoose');

const companyImageSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const CompanyImage = mongoose.model('CompanyImage', companyImageSchema);

module.exports = CompanyImage;
