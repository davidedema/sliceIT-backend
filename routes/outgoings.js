import express from "express";
import { getOutgoings, getOutgoing } from "../controllers/outgoings.js";
import { validateToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/:id", validateToken, getOutgoing);

// QUESTA ROTTA È SBAGLIATA, C'È GIA SU UTENTE NON PUOI TRATTARE LA RISORSA OUTGOING COME UNA RISORSA UTENTE
router.get("/:id/outgoings", validateToken, getOutgoings);



export default router;
