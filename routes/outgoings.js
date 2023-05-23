import express from "express";
import {
    createOutgoing,
} from "../controllers/outgoings.js";
import { validateToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/", validateToken, createOutgoing);

export default router;
