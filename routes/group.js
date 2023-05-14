import express from "express";
import {
  createGroup,
  joinGroup,
  updateGroup,
  leaveGroup,
  addOutgoing,
  getUserGroups,
} from "../controllers/group.js";
import { validateToken } from "../middleware/auth.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Group
 *  description: API to handle Groups
 */

router.post("/createGroup", validateToken, createGroup);
router.put("/joinGroup", validateToken, joinGroup);
router.put("/updateGroup/:groupId", validateToken, updateGroup);
router.delete("/leaveGroup/:groupId", validateToken, leaveGroup);
router.get("/addOutgoing/:groupId", validateToken, addOutgoing);
router.delete("/getUserGroups", getUserGroups);

export default router;
