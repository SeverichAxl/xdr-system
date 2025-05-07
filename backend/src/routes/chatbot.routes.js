import express from "express";
import { message } from "../controllers/chatbot.controller.js";

const router = express.Router();

router.post("/", message);

export default router;
