import Model from "../models/product.js";

// class Controller {
//   get(res, req, next) {
//     let query = req.query.q;
//     console.log(query);
//     Model.find({ name: { $regex: `.*${query}.*` } }, (err, products) => {
//       if (err) {
//         res.send(err);
//       } else {
//         res.send(products);
//       }
//     });
//   }
// }

class Controller {
  get(res, req, next) {
    let query = req.query.q;
    if (typeof query !== "undefined") {
      Model.find(
        { name: { $regex: `.*${query}.*`, $options: "i" } },
        (err, products) => {
          if (err) {
            res.send(err);
          } else {
            res.send(products);
          }
        }
      );
    } else {
      res.send("Query parameter 'q' is undefined");
    }
  }
}

const controller = new Controller();
export default controller;
