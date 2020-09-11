const express = require("express");
const router = express.Router();


const checkAuth = require('../middleware/check-auth');
const ProductController = require("../controllers/products");
const UploadService = require("../service/upload_image");
const CurrentProduct = require("../service/productById");
//const ProductImagePostController = require("../controllers/productImagePostController");
const ProductPostController = require("../controllers/productPostController");
const ProductQuantityPostController = require("../controllers/ProductQuantityPostController");
const GetMyProductController = require("../controllers/GetMyProductController");
const ProductResource = require("../resources/productResource");

router.get("/", checkAuth, ProductController.allProduct);

//upload didepan midleware lain artinya upload dulu baru midleware lain, array artinya upload beberapa file
//single adalah bawaan multer library, bisa juga array
/*
router.post("/", checkAuth, UploadService.array('productImage',4) ,ProductPostController
    ,ProductQuantityPostController ,ProductPostImageController,ProductResource);
*/
router.post("/", checkAuth, ProductPostController
    ,ProductQuantityPostController ,ProductResource);

router.get("/myproducts", checkAuth, GetMyProductController); //,ProductGetQtyController

router.get("/:productId", checkAuth, ProductController.productGet);

router.post("/:productId", checkAuth, UploadService.array('productImage'), CurrentProduct,
    ProductController.productPatch);

router.delete("/:productId", checkAuth, CurrentProduct, ProductController.deleteProduct);


module.exports = router;
