const express = require('express')
const router = express.Router()
const { addCompanyImage, getCompanyImage } = require('../controller/companyImages');

router.get('/', getCompanyImage);
router.post('/create', addCompanyImage);

module.exports = router;

