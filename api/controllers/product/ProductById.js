const Product = require("../../models/product");

const producById = (req,res,next) =>{
    const id = req.params.productId;
    Product.findById(id)
      .select("productImage")
      .exec()
      .then(doc => {
        if (doc) {
          req.currentProduct = doc
        } else {
          res
            .status(404)
            .json({ message: "No valid entry found for provided ID", status:404 });
        }
        next();
      })
      .catch(err => {
        // console.log(err);
        res.status(500).json({ error: err });
      });
}

module.exports = producById;