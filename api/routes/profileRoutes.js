const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const MyProfileController = require('../controllers/profile/myProfileController');
const UpdateOrCreateProfileController = require('../controllers/profile/UpdateOrCreateProfileController');
const validationProfileName = require('../controllers/profile/validationProfileNameController');
const ProfileResource = require('../resources/ProfilePostResource')

router.get('/', checkAuth, MyProfileController);
router.post('/', checkAuth, validationProfileName.validate('postProfile'), validationProfileName.findName,
    UpdateOrCreateProfileController,ProfileResource);

module.exports = router;