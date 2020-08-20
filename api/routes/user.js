const express = require("express");
const router = express.Router();

const UserController = require ("../controllers/user");

//ini untuk daftar user, jika tidak di temukan email yg sama, maka bisa di create user baru
router.post("/signup", UserController.user_singup );

//ini untuk login dan create token
router.post("/login", UserController.user_login);

router.delete("/:userId", UserController.user_delete);

module.exports = router;
