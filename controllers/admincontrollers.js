import Model from "../models/admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import utils from "../utils/token.js";
// class Controller {
// get all
export function getAll(req, res, next) {
  Model.find({}, (err, response) => {
    if (err) return next(err);
    res.status(200).send({ success: true, response });
  });
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
export async function post(req, res, next) {
  try {
    const { userName, password } = req.body;

    // validate admin input
    if (!(userName && password)) {
      res.status(400).send("All input required");
    }

    // check if admin is already exists
    const oldAdmin = await Model.findOne({ userName });

    if (oldAdmin) {
      return res.status(409).send("Admin already exists, please login");
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // create admin token
    const token = utils.getToken(userName, "5h");

    res.cookie("jwt", token, {
      httpOnly: true,
      expiration: "2h",
    });

    // Create the admin
    const admin = await Model.create({
      userName: userName,
      password: hashPassword,
      token: token,
    });

    // const token = jwt.sign(
    //   { admin_id: admin._id, userName },
    //   process.env.TOKEN_KEY,
    //   {
    //     expiresIn: "5h",
    //   }
    // );

    //save admin token
    // admin.token = token;

    //admin
    res.status(201).json(admin);
  } catch (err) {
    res.status(400).send(err.message, "Invalid credentials");
    // return res.status(400).send(req.body);
  }
}

export async function login(req, res, next) {
  try {
    const { userName, password } = req.body;

    // validate admin input
    if (!(userName && password)) {
      res.status(400).send("All input required");
    }

    // validate if admin exists in database
    const admin = await Model.findOne({ userName });

    if (admin && (await bcrypt.compare(password, admin.password))) {
      // create token
      const token = utils.getToken(userName, "5h");

      // save admin token
      res.cookie("jwt", token);

      // admin
      return res.status(200).send("Login succesfully");
    } else {
      res.status(400).send("incorrect username or password");
    }
  } catch (err) {
    return res.status(400).send("Invalid Credentials");
  }
}

export function logOut(req, res) {
  res.clearCookie("jwt");
  return res.send("Log out successfully");
}

export function put(req, res, next) {
  let { id } = req.params;
  try {
    Model.findOneAndUpdate(
      { _id: id },
      req.body,
      { new: true },
      (err, response) => {
        if (err) return next(err);
        res.status(200).send({ sucess: true, response });
      }
    );
  } catch (err) {
    console.log(err);
  }
}

//delete admin
export function deleteOne(req, res, next) {
  let { id } = req.params;
  Model.findOneAndDelete({ _id: id }, (err, response) => {
    if (err) return next(err);
    res
      .status(200)
      .send({ success: true, response, message: "Login Succesfully" });
  });
}
// }
const controller = {
  getAll,
  get,
  post,
  put,
  deleteOne,
  login,
  logOut,
};

export default controller;
