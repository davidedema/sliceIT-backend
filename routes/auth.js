import express from 'express';
import { registerUser, loginUser, prova} from '../controllers/auth.js';

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/prova", prova);


export default router;