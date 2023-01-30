import Model from "../models/category.js";

export async function addCategory(req, res, next) {
  Model.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
}

export function getAll(req, res, next) {
  Model.find(function (err, todos) {
    if (err) return next(err);
    res.json(todos);
  });
}

//get by id
export function get(req, res, next) {
  Model.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
}

export function put(req, res, next) {
  Model.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
}

export function Delete(req, res, next) {
  Model.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
}

const Category = {
  addCategory,
  getAll,
  get,
  put,
  Delete,
};

export default Category;
