import express from "express";
import {
  createGroup,
  joinGroup,
  updateGroup,
  leaveGroup,
} from "../controllers/group.js";
import { validateToken } from "../middleware/auth.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Groups
 *  description: API to handle groups
 */

/**
 * @swagger
 * /api/v1/groups/createGroup:
 *   post:
 *     summary: create a new group
 *     description: create a new group
 *     tags:
 *       -  Groups
 *     produces:
 *       -  application/json
 *     requestBody:
 *       content:
 *        application/json:
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
 *               description:
 *                type: string
 *                example: "description example"
 *                description: Description of the group
 *               groupPicture:
 *                type: string
 *                example: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fgroup%2520of%2520people%2F&psig=AOvVaw0QZ4Z3Z2Z2Z2Z2Z2Z2Z2Z2&ust=" 
 *     
 *      responses:
 *        201:
 *         description: Group created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "name"
 *                 description: Name of the group
 *               inviteLink:
 *                 type: string
 *                 example: "2Yq4Z5Q7X1x3Y4z5Q7x"
 *                 description: Link to join the group
 *               description:
 *                type: string
 *                example: "description example"
 *                description: Description of the group
 *               groupPicture:
 *                type: string
 *                example: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fgroup%2520of%2520people%2F&psig=AOvVaw0QZ4Z3Z2Z2Z2Z2Z2Z2Z2Z2&ust=" 
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
router.put("/:groupId/updateGroup", validateToken, updateGroup);
router.put("/:groupId/leaveGroup", validateToken, leaveGroup);

export default router;
