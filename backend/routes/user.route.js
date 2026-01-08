import express from "express";
import multer from "multer";
import {
  signup,
  login,
  me,
  updateProfile,
  getAllUsers,
  getUserById,
  deleteUser,
} from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/signup", signup);
router.post("/login", login);

router.get("/me", authMiddleware, me);
router.put("/profile", authMiddleware, upload.single("avatar"), updateProfile);
router.get("/users", authMiddleware, getAllUsers);
router.get("/user/:id", getUserById);
router.delete("/user/:id", authMiddleware, adminMiddleware, deleteUser);

export default router;
