const express = require("express");
const router = express.Router();


const checkAuth = require('../middleware/check-auth');
const ProductController = require("../controllers/products");
const UploadService = require("../service/upload_image");
const CurrentProduct = require("../service/productById");

router.get("/", checkAuth, ProductController.allProduct);

//upload didepan midleware lain artinya upload dulu baru midleware lain, single artinya upload 1 file saja
//single adalah bawaan multer library
router.post("/", checkAuth, UploadService.single('productImage'),
    ProductController.productPost);

router.get("/myproducts", checkAuth, ProductController.myProduct);

router.get("/:productId", checkAuth, ProductController.productGet);

router.post("/:productId", checkAuth, UploadService.single('productImage'), CurrentProduct,
    ProductController.productPatch);

router.delete("/:productId", checkAuth, CurrentProduct, ProductController.deleteProduct);


module.exports = router;
