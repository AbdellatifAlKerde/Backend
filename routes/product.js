import express from "express";
const router = express.Router();
import controller from "../controllers/productcontrollers.js";
import { deleteOne } from "../controllers/productcontrollers.js";
import verifyToken from "../middleware/admin.js";
import addImage from "../middleware/images.js";

router.get("/", verifyToken, controller.getAll);
router.get("/:id", verifyToken, controller.get);
router.post("/", verifyToken, controller.post);
router.put("/:id", verifyToken, controller.put);
router.delete("/:id", verifyToken, deleteOne);

export default router;
