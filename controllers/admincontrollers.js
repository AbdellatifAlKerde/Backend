import Model from "../models/admin.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
// class Controller {
    // get all
   export function getAll (req, res, next) {
      Model.find({}, (err, response) =>{
        if (err) return next(err);
        res.status(200).send({ success: true, response });
      })
       
    }
   
    //get by id
    export function get(req, res, next) {
      let { id } = req.params;
      Model.findOne({ _id: id }, (err, response) => {
          if (err) return next(err);
          res.status(200).send({ success: true, response });
      });
    }
//add admin
export async function  post(req, res, next) {
  
  const usernameExist = await Model.findOne({userName: req.body.username});
  if (usernameExist) return res.status(400).send("User already exists")

  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(req.body.password, salt)

  


  try {
    let body = req.body;
    let newAdmin = new Model(body);
    newAdmin.save((error, response) => {
      if (error) return res.status(500).send(error);
      res.status(200).send({ success: true, response });
    });
  }catch (err) {
    res.status(400).send(err)
  }}


export function put(req, res, next) {
  let { id } = req.params;
  try{
  Model.findOneAndUpdate({ _id: id },req.body,{new:true},(err,response)=>{
      if (err) return next(err);
      res.status(200).send({ sucess: true, response });})
    }catch(err){console.log(err)}}


//delete admin
export function deleteOne(req, res, next) {
    let { id } = req.params;
    Model.findOneAndDelete({ _id: id }, (err, response) => {
      if (err) return next(err);
      res.status(200).send({ success: true, response });
    });
  }
// }
const controller = {
  getAll,
  get,
  post,
  put,
  deleteOne,
};

export default controller;



