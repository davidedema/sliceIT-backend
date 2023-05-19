import express from "express";
import {
  getGroup,
  getGroupUsers,
  getGroupOutgoings,
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

/* READ */

/**
 * @swagger
 * /api/v1/groups/:groupId:
 *   get:
 *     summary: Get a group by id
 *     description: Get a group by id
 *     tags: 
 *       - Groups
 *     produces:
 *       - application/json
 *     security:
 *       - jwt: []
 *     parameters:
 *       - in: path
 *         name: groupId
 *         type: string
 *         description: Id of the group
 *         required: true
 * 
 *     responses:
 *       200:
 *         description: Group found, return it
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "name"
 *                   description: Name of the group
 *                 inviteLink:
 *                   type: string
 *                   example: "2Yq4Z5Q7X1x3Y4z5Q7x"
 *                   description: Link to join the group
 *                 description:
 *                   type: string
 *                   example: "description example"
 *                   description: Description of the group
 *                 groupPicture:
 *                   type: string
 *                   example: "https://example.com/new-group-picture.jpg"
 *                   description: Link to the group picture
 *                 members:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "5f9d88b9c2b3d11f3c0b1b0a"
 *                         description: Id of the user
 *                 outgoings: 
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "5f9d88b9c2b3d11f3c0b1b0a"
 *                         description: Id of the outgoing                 
 *       403:
 *         description: Forbidden, user is not a member of the group
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "L'utente non è membro del gruppo."
 *       404:
 *         description: Group not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Group not found"                           
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
router.get("/:groupId", validateToken, getGroup);

/**
 * @swagger
 * /api/v1/groups/:groupId/users:
 *   get:
 *     summary: Get the group users by it's id
 *     description: Get the group users by it's id
 *     tags: 
 *       - Groups
 *     produces:
 *       - application/json
 *     security:
 *       - jwt: []
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         description: Id of the group
 *         required: true
 * 
 *     responses:
 *       200:
 *         description: Group found, return the users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 members:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "5f9d88b9c2b3d11f3c0b1b0a"
 *                         description: Id of the user                
 *       403:
 *         description: Forbidden, user is not a member of the group
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "L'utente non è membro del gruppo."
 *       404:
 *         description: Group not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Group not found"                           
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
router.get("/:groupId/users", validateToken, getGroupUsers);

/**
 * @swagger
 * /api/v1/groups/:groupId/outgoings:
 *   get:
 *     summary: Get the group users by it's id
 *     description: Get the group users by it's id
 *     tags: 
 *       - Groups
 *     produces:
 *       - application/json
 *     security:
 *       - jwt: []
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         description: Id of the group
 *         required: true
 * 
 *     responses:
 *       200:
 *         description: Group found, return the users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 outgoings:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "5f9d88b9c2b3d11f3c0b1b0a"
 *                         description: Id of the group
 *       403:
 *         description: Forbidden, user is not a member of the group
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "L'utente non è membro del gruppo."
 *       404:
 *         description: Group not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Group not found"                           
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
router.get("/:groupId/outgoings", validateToken, getGroupOutgoings);

/* POST */

/**
 * @swagger
 * /api/v1/groups/createGroup:
 *   post:
 *     summary: Create a new group
 *     description: Create a new group
 *     tags:
 *       - Groups
 *     produces:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
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
 *               description:
 *                 type: string
 *                 example: "description example"
 *                 description: Description of the group
 *               groupPicture:
 *                 type: string
 *                 example: "https://example.com/new-group-picture.jpg"
 *
 *     responses:
 *       201:
 *         description: Group created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "name"
 *                   description: Name of the group
 *                 inviteLink:
 *                   type: string
 *                   example: "2Yq4Z5Q7X1x3Y4z5Q7x"
 *                   description: Link to join the group
 *                 description:
 *                   type: string
 *                   example: "description example"
 *                   description: Description of the group
 *                 groupPicture:
 *                   type: string
 *                   example: "https://example.com/new-group-picture.jpg"
 *                   description: Picture of the group
 *                 members:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "5f9d88b9c2b3d11f3c0b1b0a"
 *                         description: Id of the user
 *                 outgoings: 
 *                   type: array
 *                   items:
 *                     type: object
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

/* UPDATE */

/**
 * @swagger
 * /api/v1/groups/joinGroup:
 *   put:
 *     summary: Join a group
 *     description: Join a group using the invite link
 *     tags:
 *       - Groups
 *     produces:
 *       - application/json
 *     security:
 *       - jwt: []
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         description: Id of the user to add to the group
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               inviteLink:
 *                 type: string
 *                 example: "2Yq4Z5Q7X1x3Y4z5Q7x"
 *                 description: Invite link to join the group
 *     responses:
 *       200:
 *         description: Group joined successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "name"
 *                   description: Name of the group
 *                 inviteLink:
 *                   type: string
 *                   example: "2Yq4Z5Q7X1x3Y4z5Q7x"
 *                   description: Link to join the group
 *                 description:
 *                   type: string
 *                   example: "description example"
 *                   description: Description of the group
 *                 groupPicture:
 *                   type: string
 *                   example: "https://example.com/new-group-picture.jpg"
 *                   description: Picture of the group
 *                 members:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                   example:
 *                     - id: "exampleIdc2b3d11f3c0b1b0a"
 *                     - id: "exampleId2c2b3d11f3c0b1b0"
 *                 outgoings: 
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: User is already a member of the group or invalid invite link
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User already a member of the group or invalid invite link"
 *       404:
 *         description: Group not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Group not found"
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
router.put("/joinGroup", validateToken, joinGroup);

/**
 * @swagger
 * /api/v1/groups/:groupId/updateGroup:
 *   put:
 *     summary: Update a group
 *     description: Update the name, description, and group picture of a group
 *     tags:
 *       - Groups
 *     produces:
 *       - application/json
 *     security:
 *       - jwt: []
 *     consumes:
 *      - application/json
 *     parameters:
 *       - in: path
 *         name: groupId
 *         type: string
 *         description: The ID of the group to update
 *         required: true
 *       - in: path
 *         name: id
 *         type: string
 *         description: The ID of the user updating the group
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "NewGroupName"
 *                 description: The updated name of the group
 *               description:
 *                 type: string
 *                 example: "New group description"
 *                 description: The updated description of the group
 *               groupPicture:
 *                 type: string
 *                 example: "https://example.com/new-group-picture.jpg"
 *                 description: The updated URL of the group picture
 *     responses:
 *       200:
 *         description: Group updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "NewGroupName"
 *                   description: New name of the group
 *                 inviteLink:
 *                   type: string
 *                   example: "2Yq4Z5Q7X1x3Y4z5Q7x"
 *                   description: Link to join the group
 *                 description:
 *                   type: string
 *                   example: "New group description"
 *                   description: New description of the group
 *                 groupPicture:
 *                   type: string
 *                   example: "https://example.com/new-group-picture.jpg"
 *                   description: New picture of the group
 *                 members:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "exampleIdc2b3d11f3c0b1b0a"
 *                 outgoings: 
 *                   type: array
 *                   items:
 *                     type: object
 *       401:
 *         description: User is not a member of the group
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User is not a member of the group"
 *       404:
 *         description: Group not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Group not found"
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
router.put("/:groupId/updateGroup", validateToken, updateGroup);

/**
 * @swagger
 * /api/v1/groups/:groupId/leaveGroup:
 *   put:
 *     summary: Leave a group
 *     description: Leave a group
 *     tags:
 *       - Groups
 *     produces:
 *       - application/json
 *     security:
 *       - jwt: []
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: groupId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the group to leave
 *       - in: path
 *         name: id
 *         type: string
 *         description: The ID of the user leaving the group
 *         required: true
 *     responses:
 *       200:
 *         description: Group left successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "NewGroupName"
 *                   description: New name of the group
 *                 inviteLink:
 *                   type: string
 *                   example: "2Yq4Z5Q7X1x3Y4z5Q7x"
 *                   description: Link to join the group
 *                 description:
 *                   type: string
 *                   example: "New group description"
 *                   description: New description of the group
 *                 groupPicture:
 *                   type: string
 *                   example: "https://example.com/new-group-picture.jpg"
 *                   description: New picture of the group
 *                 members:
 *                   type: array
 *                   items:
 *                     type: object
 *                 outgoings: 
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: User is not a member of the group
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User is not a member of the group"
 *       404:
 *         description: Group not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Group not found"
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
router.put("/:groupId/leaveGroup", validateToken, leaveGroup);

export default router;
