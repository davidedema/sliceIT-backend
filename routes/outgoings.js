import express from "express";
import {

} from "../controllers/outgoings.js";
import { validateToken } from "../middleware/auth.js";

const router = express.Router();

export default router;
