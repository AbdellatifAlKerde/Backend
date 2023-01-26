import express from "express";
const router = express.Router();
import controller from "../controllers/admincontrollers.js";
import verifyToken from "../middleware/admin.js";

router.get("/", verifyToken, controller.getAll);
router.get("/:id", verifyToken, controller.get);
router.post("/logout", controller.logOut);
router.post("/register", controller.post);
router.put("/:id", verifyToken, controller.put);
router.delete("/:id", verifyToken, controller.deleteOne);
router.post("/login", controller.login);

export default router;
