import express from 'express';
import { getUser, updateUser, deleteUser } from '../controllers/users.js';
import { validateToken } from '../middleware/auth.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: API to handle users
 */

/* READ */

/**
 * @swagger
 * /api/v1/users/:id:
 *   get:
 *     summary: Get a user by id
 *     description: Get a user by id
 *     tags: 
 *       - Users
 *     produces:
 *       - application/json
 *     security:
 *       - jwt: []
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         description: Id of the user
 *         required: true
 * 
 *     responses:
 *       200:
 *         description: User found, return it
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   example: "exampleATexample.com"      
 *                   description: Email of the user
 *                 password:
 *                   type: string
 *                   format: password
 *                   example: "password"
 *                   description: Password of the user
 *                 nickname:
 *                   type: string
 *                   example: "nickname"
 *                 firstName:
 *                   type: string
 *                   example: "name"
 *                 lastName:
 *                   type: string
 *                   example: "surname"
 *                 groups:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                       type: string
 *                       example: "5f9d88b9c2b3d11f3c0b1b0a"
 *                       description: Id of the group
 *                 outgoings: 
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                       type: string
 *                       example: "5f9d88b9c2b3d11f3c0b1b0a"
 *                       description: Id of the outgoing                 
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Not authorized"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found"                           
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
router.get("/:id", validateToken, getUser);

/* UPDATE */

/**
 * @swagger
 * /api/v1/users/:id:
 *   put:
 *     summary: Modify an existing user
 *     description: Modify an existing user, with the specified data.
 *     tags:
 *       - Users 
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
 *         description: The ID of the user to edit. 
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                 email:
 *                   type: string
 *                   example: "exampleATexample.com"      
 *                   description: Email of the user
 *                 password:
 *                   type: string
 *                   format: password
 *                   example: "password"
 *                   description: Password of the user
 *                 nickname:
 *                   type: string
 *                   example: "nickname"
 *                 firstName:
 *                   type: string
 *                   example: "name"
 *                 lastName:
 *                   type: string
 *                   example: "surname"
 *                 groups:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                       type: string
 *                       example: "5f9d88b9c2b3d11f3c0b1b0a"
 *                       description: Id of the group
 *                 outgoings: 
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                       type: string
 *                       example: "5f9d88b9c2b3d11f3c0b1b0a"
 *                       description: Id of the outgoing  
 *     
 *     responses:
 *       200:
 *         description: Returns the newly created user id.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   example: "exampleATexample.com"      
 *                   description: Email of the user
 *                 password:
 *                   type: string
 *                   format: password
 *                   example: "password"
 *                   description: Password of the user
 *                 nickname:
 *                   type: string
 *                   example: "nickname"
 *                 firstName:
 *                   type: string
 *                   example: "name"
 *                 lastName:
 *                   type: string
 *                   example: "surname"
 *                 groups:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                       type: string
 *                       example: "5f9d88b9c2b3d11f3c0b1b0a"
 *                       description: Id of the group
 *                 outgoings: 
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                       type: string
 *                       example: "5f9d88b9c2b3d11f3c0b1b0a"
 *                       description: Id of the outgoing  
 *       400:
 *         description: Already existing user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User already exists"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Not authorized"
 *       500:
 *         description: Intenal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 */
router.put("/:id", validateToken, updateUser);

/* DELETE */

/**
 * @swagger
 * /api/v1/users/:id:
 *   delete:
 *     summary: Delete a user by id
 *     description: Delete a user by id
 *     tags: 
 *       - Users
 *     produces:
 *       - application/json
 *     security:
 *       - jwt: []
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         description: Id of the user
 *         required: true
 * 
 *     responses:
 *       200:
 *         description: User found, Deleted it
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties: 
 *                 message:
 *                   type: string
 *                   example: "User deleted successfully"
 *                            
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Not authorized"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found"                           
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
router.delete("/:id", validateToken, deleteUser);

export default router;