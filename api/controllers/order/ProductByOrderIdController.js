const Order = require("../../models/order");

const producById = (req,res,next) =>{
  if(req.body.code == 3){
    const id = req.body.order_id;
    Order.findById(id)
      .exec()
      .then(doc => {
        if (doc) {
          req.body = doc
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
  else next();

}

module.exports = producById;