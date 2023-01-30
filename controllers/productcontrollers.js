import Model from "../models/product.js";
import fs from "fs";
import image from "../middleware/image.js";
class Controller {
  getAll(req, res, next) {
    Model.find({}, (err, response) => {
      if (err) return next(err);
      res.status(200).send({ success: true, response });
    });
  }

  //get by id
  get(req, res, next) {
    let { id } = req.params;
    Model.findOne({ _id: id }, (err, response) => {
      if (err) return next(err);
      res.status(200).send({ success: true, response });
    });
  }

  // create
  async post(req, res, next) {
    try {
      let body = req.body;
      let newproduct = new Model(body);
      newproduct.save((error, response) => {
        if (error) return res.status(500).send(error);
        res
          .status(200)
          .send({ success: true, message: "Product Added Succesfully" });
      });
    } catch (e) {
      return res.status(500).send(e);
    }
  }

  updateProduct(req, res, next) {
    const id = req.params.id;
    const newProduct = req.body;
    Model.findByIdAndUpdate(id, newProduct, {
      new: true,
      runValidators: true,
    })
      .then((update) => {
        if (update) {
          res.status(200).send(update);
        } else {
          res.status(404).send("Not Found");
        }
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }

  // update
  put(req, res, next) {
    let body = req.body;
    let data = {};
    let id = req.params.id;
    if ("name" in body) data.name = body.name;
    if ("price" in body) data.price = body.price;
    if ("description" in body) data.description = body.description;
    if ("category" in body) data.category = body.category;
    data.image = req.image;
    try {
      Model.findOne({ _id: id }, (err, product) => {
        if (err) return next(err);
        fs.unlink(product.image, (err) => {
          if (err) return next(err);
          product.image = req.image;
          product.save((err, updateProduct) => {
            if (err) return next(err);
            res.status(201).send({ success: true, updateProduct });
          });
        });
      });
    } catch (err) {
      res.status(err.status).send(err.message);
    }
  }
}
export async function deleteOne(req, res, next) {
  const { id } = req.params;

  Model.findOneAndDelete({ _id: id })
    .then((response) => {
      if (!response) {
        res.status(404).send({ status: 404, message: "Not Found" });
      } else {
        fs.unlinkSync(response.image);
        res.status(200).send({ status: 200, message: "deleted successfully" });
      }
    })
    .catch((error) => {
      res.status(500).send({ status: 500, message: error.message });
    });
}
const controller = new Controller();

export default controller;
