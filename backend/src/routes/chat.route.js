// chat.route.js
import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getStreamToken } from "../controllers/chat.controller.js";

const router = express.Router();

// Final route: /api/chats/token
router.get("/token", protectRoute, getStreamToken);

export default router;
