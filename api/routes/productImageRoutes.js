const express = require('express');
const removeSingleImage = require('../controllers/productImage/removeSingleImageController');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const removeSingleImageController = require('../controllers/productImage/removeSingleImageController');
const validateUserImageController = require('../controllers/productImage/validateUserImageController');

router.delete('/:id',checkAuth, validateUserImageController,removeSingleImageController);

module.exports = router;