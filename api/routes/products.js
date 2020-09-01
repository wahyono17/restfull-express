const express = require("express");
const router = express.Router();


const checkAuth = require('../middleware/check-auth');
const ProductController = require("../controllers/products");
const UploadService = require("../service/upload_image");
const CurrentProduct = require("../service/productById");
const ProductPostImageController = require("../controllers/productPostImageController");
const ProductPostController = require("../controllers/productPostController");
const ProductPostQtyController = require("../controllers/ProductPostQtyController");
const ProductResource = require("../resources/productResource");

router.get("/", checkAuth, ProductController.allProduct);

//upload didepan midleware lain artinya upload dulu baru midleware lain, array artinya upload beberapa file
//single adalah bawaan multer library, bisa juga array
router.post("/", checkAuth, UploadService.array('productImage',4) ,ProductPostController
    ,ProductPostQtyController ,ProductPostImageController,ProductResource);


router.get("/myproducts", checkAuth, ProductController.myProduct);

router.get("/:productId", checkAuth, ProductController.productGet);

router.post("/:productId", checkAuth, UploadService.array('productImage'), CurrentProduct,
    ProductController.productPatch);

router.delete("/:productId", checkAuth, CurrentProduct, ProductController.deleteProduct);


module.exports = router;
