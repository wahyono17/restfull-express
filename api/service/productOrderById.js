const Product = require("../models/product");

const producById = (req,res,next) =>{

    const id = req.body.productId;
    Product.findById(id)
      .exec()
      .then(result => {
        if (result) {
          req.product = result

        } else {
          res
            .status(404)
            .json({ message: "No valid entry found for provided ID", status:404 });
        }
        next();
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
}

module.exports = producById;