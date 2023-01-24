
import Model from "../models/admin.js";
import bcrypt from "bcrypt"
class Controller {
    // get all
    getAll (req, res, next) {
      Model.find({}, (err, response) =>{
        if (err) return next(err);
        res.status(200).send({ success: true, response });
      })
       
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
// async post(req,res,next) {
//   try{let body = req.body;
//   body.password = await bcrypt.hash(body.body, 10)
//   let newproduct = new Model(body) 
//   newproduct.save((error,response) => {
//     if (error) return res.status(500).send(error);
//     res.status(200).send({ success: true, response })});}catch(e){return res.status(500).send(e)}
// };

//add admin
async post(req, res, next) {
  try {
    let body = req.body;
    let newAdmin = new Model(body);
    newAdmin.save((error, response) => {
      if (error) return res.status(500).send(error);
      res.status(200).send({ success: true, response });
    });
  } catch (e) {
    return res.status(500).send(e);
  }
}

// update
// put(req,res,next) {
// let { id }=req.params;
// Model.updateOne({_id:id}),(err,response) =>{
//   if (err) return next(err);
//   res.status(200).send({sucess: true ,response});
// }
// }

//update
put(req, res, next) {
  // console.log("ao")
  let { id } = req.params;
  try{
  Model.findOneAndUpdate({ _id: id },req.body,{new:true},(err,response)=>{
      if (err) return next(err);
      res.status(200).send({ sucess: true, response });})
    }catch(err){console.log(err)}}

// delete
// delete(req,res,next){
// let {id} =req.params;
// Model.findByIdAndDelete({_id:id}),(err,response) =>{
//   if(err) return next(err);
//    res.status(200).send({sucess: true ,response});
// }
// }

//delete admin
 deleteOne(req, res, next) {
    let { id } = req.params;
    Model.findOneAndDelete({ _id: id }, (err, response) => {
      if (err) return next(err);
      res.status(200).send({ success: true, response });
    });
  }
}
const controller = new Controller();

export default controller;



