import express from "express";
import {
  createGroup,
  joinGroup,
  updateGroup,
  leaveGroup,
} from "../controllers/group.js";
const router = express.Router();

router.post("/createGroup", createGroup);
router.put("/joinGroup", joinGroup);
router.put("/:groupId", updateGroup);
router.delete("/:groupId/leave", leaveGroup);

export default router;
