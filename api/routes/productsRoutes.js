const express = require("express");
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const checkProfile = require('../middleware/check-profile');
const totalPage = require('../controllers/product/countAllProduct');
const totalMyPage = require('../controllers/product/countMyProduct');
const UploadService = require("../service/upload_image");
const CurrentProduct = require("../controllers/product/ProductById");
const ProductImagePostController = require("../controllers/productImage/productImagePostController");
const ProductRemoveImageController = require("../controllers/productImage/productRemoveImageController");
const ProductPatchImageController = require("../controllers/productImage/productPatchImageController");
const PostImageToCloud = require('../controllers/productImage/postImageToCloudController');
const RemoveImageWasUpload = require('../controllers/productImage/removeImageWasUploadController');
const ProductPostController = require("../controllers/product/ProductPostController");
const ProductQuantityPostController = require("../controllers/productQty/ProductQuantityPostController");
const ProductQuantityPatchController = require("../controllers/productQty/ProductQuantityPatchController");
const GetMyProductController = require("../controllers/product/GetMyProductController");
const MyProductResource = require("../resources/MyProductResource");
const AllProductResource = require("../resources/AllProductResource");
const SingleProductResource = require("../resources/singleProductResource");
const GetAllProductController = require("../controllers/product/GetAllProductController");
const ProductGetController = require("../controllers/product/ProductGetController");
const ProductPatchController = require("../controllers/product/ProductPatchController");
const ProductDeleteController = require("../controllers/product/ProductDeleteController");
const validationProduct = require('../controllers/product/validationProductController');
const ProductResource = require("../resources/ProductResource");

const test = require("../controllers/product/test");

router.get("/", checkAuth, GetAllProductController,totalPage,AllProductResource);

//upload didepan midleware lain artinya upload dulu baru midleware lain, array artinya upload beberapa file
//single adalah bawaan multer library, bisa juga array

router.post("/", checkAuth, checkProfile,UploadService.array('productImage',4),validationProduct
    ,PostImageToCloud,ProductPostController,ProductQuantityPostController ,ProductImagePostController
    ,RemoveImageWasUpload,ProductResource);

router.get("/myproducts", checkAuth, GetMyProductController,totalMyPage,MyProductResource);

router.get("/:productId", checkAuth, ProductGetController,SingleProductResource);

router.post("/:productId", checkAuth, checkProfile, UploadService.array('productImage',4),validationProduct
    ,PostImageToCloud,CurrentProduct,ProductQuantityPatchController,ProductRemoveImageController
    ,ProductPatchImageController,RemoveImageWasUpload,ProductPatchController);

router.delete("/:productId", checkAuth, ProductDeleteController);


module.exports = router;
