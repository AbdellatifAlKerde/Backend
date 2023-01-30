// const jwt = require("jsonwebtoken");
// import jwt from "jsonwebtoken";

// const verifyToken = (req, res, next) => {
//   const token = req.header("user-token");
//   if (!token)
//     return res
//       .status(401)
//       .send("Access Denied, token is required for authentication");

//   try {
//     const verified = jwt.verify(token, process.env.TOKEN);
//     req.admin = verified;
//     next();
//   } catch (err) {
//     res.status(400).send("Invalid Token");
//   }
// };

// export default verifyToken;

import jwt from "jsonwebtoken";

const config = process.env;

const verifyToken = (req, res, next) => {
  const token =
    // req.body.token || req.query.token || req.headers["x-access-token"];
    req.cookies["jwt"];
  // console.log(token);
  // req.cookie("Auth");
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.admin = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

export default verifyToken;
