const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const MyProfileController = require('../controllers/profile/myProfileController');
const UpdateOrCreateProfileController = require('../controllers/profile/UpdateOrCreateProfileController');
const validationProfileName = require('../controllers/profile/validationProfileNameController');
const ProfileResource = require('../resources/ProfileResource');
const listKecamatan = require('../controllers/profile/listKecamatanController');
const listKabupaten = require('../controllers/profile/listKabupatenController');
const listProvinsi = require('../controllers/profile/listProvinsiController');
const myListKecamatan = require('../controllers/profile/myListKecamatanController');
const myListKabupaten = require('../controllers/profile/myListKabupatenController');
const storeByKecamatan = require('../controllers/profile/storeByKecamatanController');
const storeByKecamatanResource = require('../resources/storeByKecamatanResource');
const storeByKabupatenResource = require('../resources/storeByKabupatenResource');
const countStoreByKecamatan = require('../controllers/profile/countStoreByKecamatan');
const countStoreByKabupaten = require('../controllers/profile/countStoreByKabupaten');
const storeByKabupaten = require('../controllers/profile/storeByKabupatenController');
// const test = require('../controllers/profile/test'); //ini untuk memasukan list kecamatan,kabupaten ke database


router.get('/', checkAuth, MyProfileController, ProfileResource);
router.post('/', checkAuth, validationProfileName.findName,
    UpdateOrCreateProfileController,MyProfileController,ProfileResource);
// router.get('/test',checkAuth, test);

router.get('/kecamatan/:kabupatenId', checkAuth, listKecamatan);
router.get('/kabupaten/:provinsiId', checkAuth, listKabupaten);
router.get('/provinsi', checkAuth, listProvinsi);

router.get('/mylistkecamatan', checkAuth, MyProfileController,myListKecamatan);
router.get('/mylistkabupaten', checkAuth, MyProfileController,myListKabupaten);

router.get('/store/kecamatan/:kecamatanId',checkAuth,storeByKecamatan,countStoreByKecamatan,storeByKecamatanResource);
router.get('/store/kabupaten/:kabupatenId',checkAuth,countStoreByKabupaten,storeByKabupaten,storeByKabupatenResource);

module.exports = router;