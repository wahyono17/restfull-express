const express = require("express");
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const checkProfile = require('../middleware/check-profile');
const totalPage = require('../controllers/product/countAllProduct');
const totalMyPage = require('../controllers/product/countMyProduct');
const UploadService = require("../service/upload_image");
const CurrentProduct = require("../controllers/product/ProductById");
//const ProductImagePostController = require("../controllers/productImagePostController");
const ProductPostController = require("../controllers/product/ProductPostController");
const ProductQuantityPostController = require("../controllers/productQty/ProductQuantityPostController");
const ProductQuantityPatchController = require("../controllers/productQty/ProductQuantityPatchController");
const GetMyProductController = require("../controllers/product/GetMyProductController");
const MyProductResource = require("../resources/MyProductResource");
const AllProductResource = require("../resources/AllProductResource");
const GetAllProductController = require("../controllers/product/GetAllProductController");
const ProductGetController = require("../controllers/product/ProductGetController");
const ProductPatchController = require("../controllers/product/ProductPatchController");
const ProductDeleteController = require("../controllers/product/ProductDeleteController");
const ProductResource = require("../resources/ProductResource");


router.get("/", checkAuth, GetAllProductController,totalPage,AllProductResource);

//upload didepan midleware lain artinya upload dulu baru midleware lain, array artinya upload beberapa file
//single adalah bawaan multer library, bisa juga array
/*
router.post("/", checkAuth, UploadService.array('productImage',4) ,ProductPostController
    ,ProductQuantityPostController ,ProductPostImageController,ProductResource);
*/
router.post("/", checkAuth, checkProfile, UploadService.array('productImage',4), ProductPostController
    ,ProductQuantityPostController ,ProductResource);

router.get("/myproducts", checkAuth, GetMyProductController,totalMyPage,MyProductResource);

router.get("/:productId", checkAuth, ProductGetController,MyProductResource);

router.post("/:productId", checkAuth, checkProfile, UploadService.array('productImage'), ProductQuantityPatchController,
    CurrentProduct, ProductPatchController, MyProductResource);

router.delete("/:productId", checkAuth, ProductDeleteController);


module.exports = router;
