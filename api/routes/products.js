const express = require("express");
const router = express.Router();


const checkAuth = require('../middleware/check-auth');

const ProductController = require("../controllers/products");
const UploadService = require("../service/upload_image");

router.get("/", checkAuth, ProductController.products_get_all);

//upload didepan midleware lain artinya upload dulu baru midleware lain, single artinya upload 1 file saja
//singe adalah bawaan multer library
router.post("/", checkAuth, UploadService.upload_image.single('productImage'), ProductController.products_post);

router.get("/:productId", checkAuth, ProductController.products_get_product);

router.patch("/:productId", checkAuth, ProductController.products_patch_product);

router.delete("/:productId", checkAuth, ProductController.products_delete_product);


module.exports = router;
