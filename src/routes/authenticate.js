import express from "express";
import { authenticateChat } from "../controllers/authenticate.js";
const router = express.Router();
router.post("/authenticate-chat", authenticateChat);

export default router;
