import express from "express";
import { getOutgoings } from "../controllers/outgoings.js";
import { validateToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/:id/outgoings", validateToken, getOutgoings);

export default router;
