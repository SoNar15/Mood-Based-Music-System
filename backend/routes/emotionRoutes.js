import express from "express";
import { detectEmotion } from "../controllers/emotionController.js";

const router = express.Router();

// POST route to trigger emotion detection
router.post("/detect", detectEmotion);

export default router;
