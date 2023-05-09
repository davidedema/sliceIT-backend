import express from 'express';
import { getUser, getUserGroups, getUserOutgoings, updateUser, deleteUser } from '../controllers/users.js';
import { validateToken } from '../middleware/auth.js';

const router = express.Router();

/* READ */
router.get("/:id", validateToken, getUser);
router.get("/:id/groups", validateToken, getUserGroups);
router.get("/:id/outgoings", validateToken, getUserOutgoings);

/* UPDATE */
router.put("/:id", validateToken, updateUser);

/* DELETE */
router.delete("/:id", validateToken, deleteUser);

export default router;