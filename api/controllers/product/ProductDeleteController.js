const Product = require("../../models/product");

const deleteProduct = (req, res, next) => {
    const id = req.params.productId;
    Product.updateOne({ _id: id },{status:'X'})
      .exec()
      .then(result => {
        res.status(200).json({
          message: 'Product deleted',
          status:200
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err, status:500
        });
      });
}

module.exports = deleteProduct;