import express from "express";
import {
  createNotification,
  getAllNotifications,
  deleteNotification,
  updateNotification,
} from "../controllar/notificationController.js";

const router = express.Router();

router.post("/", createNotification);
router.get("/", getAllNotifications);
router.patch("/:id" , updateNotification);
router.delete("/:id", deleteNotification);

export default router;
