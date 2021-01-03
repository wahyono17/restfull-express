const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const UserController = require ("../controllers/UserController");
const UserModifyController = require("../controllers/userModifyController");
const userModifyController = require("../controllers/userModifyController");

//ini untuk daftar user, jika tidak di temukan email yg sama, maka bisa di create user baru
router.post("/signup", UserController.user_singup );

//ini untuk login dan create token
router.post("/login", UserController.user_login);

//ini untuk modify password
router.post("/patch",checkAuth,userModifyController);

router.delete("/:userId", UserController.user_delete);

module.exports = router;
