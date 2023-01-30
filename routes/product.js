import express from "express";
const router = express.Router();
import controller from "../controllers/productcontrollers.js";
import { deleteOne } from "../controllers/productcontrollers.js";
import verifyToken from "../middleware/admin.js";
import image from "../middleware/image.js";

router.get("/", verifyToken, controller.getAll);
router.get("/:id", verifyToken, controller.get);
router.post("/", verifyToken, image.uploadImage, controller.post);
router.put("/:id", verifyToken, image.uploadImage, controller.put);
router.delete("/:id", verifyToken, deleteOne);

export default router;
