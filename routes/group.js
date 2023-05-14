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

/**
 * @swagger
 * /api/v1/group/createGroup:
 *   post:
 *     summary: create a new group
 *     description: create a new group
 *     tags:
 *       -
 *     produces:
 *       -
 *     consumes:
 *       -
 *     requestBody:
 *       content:
 *
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - inviteLink
 *             properties:
 *               name:
 *                 type: string
 *                 example: "name"
 *                 description: Name of the group
 *               inviteLink:
 *                 type: string
 *                 example: "2Yq4Z5Q7X1x3Y4z5Q7x"
 *                 description: Link to join the group
 *     responses:
 *       201:
 *         description: Group created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                group:
 *                 type: object
 *                 properties:
 *                  name:
 *                    type: string
 *                    example: "name"
 *                  inviteLink:
 *                    type: string
 *                    example: "2Yq4Z5Q7X1x3Y4z5Q7x"
 *
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
router.post("/createGroup", validateToken, createGroup);
router.put("/joinGroup", validateToken, joinGroup);
router.put("/updateGroup/:groupId", validateToken, updateGroup);
router.delete("/leaveGroup/:groupId", validateToken, leaveGroup);
router.get("/addOutgoing/:groupId", validateToken, addOutgoing);
router.delete("/getUserGroups", getUserGroups);

export default router;
