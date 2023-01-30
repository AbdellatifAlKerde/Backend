import express from "express";
const router = express.Router();
import controller from "../controllers/searchcontrollers.js";

router.get("/", controller.get);

export default router;
