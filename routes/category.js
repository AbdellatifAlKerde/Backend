import express from "express";
const router = express.Router();
import controller from "../controllers/categoryControllers.js";
import verifyToken from "../middleware/admin.js";

router.post("/", verifyToken, controller.addCategory);
router.get("/", verifyToken, controller.getAll);
router.get("/:id", verifyToken, controller.get);
router.put("/:id", verifyToken, controller.put);
router.delete("/:id", verifyToken, controller.Delete);

export default router;
