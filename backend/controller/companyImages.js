const mongoose = require('mongoose');
const CompanyImage = require('../models/companyImages');

const getCompanyImage = async (req, res) => {
  try {
    const images = await CompanyImage.find();
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ msg: 'Internal server error' });
  }
};

const addCompanyImage = async (req, res) => {
  try {
    const { imageUrl } = req.body;
    // if (!imageUrl) {
    //   return res.status(400).json({ msg: 'Image URL is required' });
    // }
    const existingImage = await CompanyImage.findOne({ imageUrl });
    if (existingImage) {
      return res.status(409).json({ msg: 'Image already exists' });
    }
    const newImage = await CompanyImage.createm({imageUrl});
    res.status(201).json(newImage);
  } catch (error) {
    res.status(500).json({ msg: 'Internal server error' });
  }
};

module.exports = { addCompanyImage, getCompanyImage };
