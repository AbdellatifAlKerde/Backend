import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
// import multer from "muler"
import connectDB from "./config/db.js";
import adminRouter from "./routes/adminroutes.js";
import productRouter from "./routes/product.js";
import categoryRouter from "./routes/category.js";
import verifyToken from "./middleware/admin.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import searchRouter from "./routes/usersearch.js";

dotenv.config();
connectDB();
const PORT = process.env.PORT || 5000;
const app = new express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

app.post("/welcome", verifyToken, (req, res) => {
  res.status(200).send("Welcome to FreeCodeCamp 🙌");
});

app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use("/api/admin", adminRouter);
app.use("/api/product", productRouter);
app.use("/api/category", categoryRouter);
app.use("/api/search", searchRouter);
app.listen(
  PORT,
  console.log(`Server Running in ${process.env.NODE_ENV} on port ${PORT}`)
);
