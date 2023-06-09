import express from 'express';
import { getUser, getUserGroups, getUserOutgoings, updateUser, deleteUser, getReport } from '../controllers/users.js';
import { validateToken } from '../middleware/auth.js';
import { get } from 'mongoose';

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
 *                         type: string
 *                         example: "5f9d88b9c2b3d11f3c0b1b0a"
 *                         description: Id of the group
 *                 outgoings: 
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "5f9d88b9c2b3d11f3c0b1b0a"
 *                         description: Id of the outgoing                 
 *       400:
 *         description: Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Missing required fields" 
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
 *
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

/**
 * @swagger
 * /api/v1/users/:id/groups:
 *   get:
 *     summary: Get the user groups by it's id
 *     description: Get the user groups by it's id. Only the user with it's token can access this resource (security reasons)
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
 *         description: User found, return the groups
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 groups: 
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "5f9d88b9c2b3d11f3c0b1b0a"
 *                         description: Id of the group   
 *                       name:
 *                         type: string
 *                         example: "name"
 *                         description: Name of the group         
 *                       desription:
 *                         type: string
 *                         example: "fordinner"
 *                         description: Description of the group
 *                       groupPicture:
 *                         type: string
 *                         example: "lemon.png"
 *                         description: Picture uri of the group  
 *                       inviteLink:
 *                         type: string
 *                         example: "https://example.com/invite/5f9d88b9c2b3d11f3c0b1b0a"
 *                         description: Invite link of the group 
 *                       members:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: string
 *                               example: "5f9d88b9c2b3d11f3c0b1b0a"
 *                               description: Id of the user
 *                       outgoings:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: string
 *                               example: "5f9d88b9c2b3d11f3c0b1b0a"
 *                               description: Id of the group
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
 *         description: User not found or groups not found
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
router.get("/:id/groups", validateToken, getUserGroups);

/**
 * @swagger
 * /api/v1/users/:id/outgoings:
 *   get:
 *     summary: Get the user outgoings by it's id
 *     description: Get the user outgoings by it's id. Only the user with it's token can access this resource (security reasons)
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
 *         description: User found, return the outgoings
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
 *                         description: Id of the outgoing   
 *                       name:
 *                         type: string
 *                         example: "name"
 *                         description: Name of the outgoing         
 *                       value:
 *                         type: number
 *                         example: "10"
 *                         description: Value of the outgoing
 *                       paidBy:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "5f9d88b9c2b3d11f3c0b1b0a"
 *                             description: Id of the user  
 *                       components:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: string
 *                               example: "5f9d88b9c2b3d11f3c0b1b0a"
 *                               description: Ids of the users
 *                       group:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "5f9d88b9c2b3d11f3c0b1b0a"
 *                             description: Ids of the users 
 *                       isPeriodic:
 *                         type: boolean
 *                         example: "true"
 *                         description: If the outgoing is periodic
 *                       tag:
 *                         type: string
 *                         example: "food"
 *                         description: Tag of the outgoing         
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
 *         description: User not found or outgoings not found
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
router.get("/:id/outgoings", validateToken, getUserOutgoings);

/* UPDATE */

/**
 * @swagger
 * /api/v1/users/:id:
 *   put:
 *     summary: Modify an existing user
 *     description: Modify an existing user, with the specified data. Only the user with it's token can modify itself(security reasons)
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
 *               email:
 *                 type: string
 *                 example: "exampleATexample.com"
 *                 description: Email of the user
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "password"
 *                 description: Password of the user
 *               nickname:
 *                 type: string
 *                 example: "nickname"
 *               firstName:
 *                 type: string
 *                 example: "name"
 *               lastName:
 *                 type: string
 *                 example: "surname"
 *               groups:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "5f9d88b9c2b3d11f3c0b1b0a"
 *                       description: Id of the group
 *               outgoings:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
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
 *                         type: string
 *                         example: "5f9d88b9c2b3d11f3c0b1b0a"
 *                         description: Id of the group
 *                 outgoings:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "5f9d88b9c2b3d11f3c0b1b0a"
 *                         description: Id of the outgoing
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
 *     description: Delete a user by id. Only the user with it's token can delete itself (security reasons)
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


/**
 * @swagger
 * /api/v1/users/:id/report:
 *   get:
 *     summary: Get report by id
 *     description: Get a report of the user
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
 *         description: User's report retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 debtors:
 *                   type: object
 *                   properties:
 *                     debtors:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           debtors:
 *                             type: string
 *                             example: "6458c6466915e3b80523e0e6"
 *                             description: ID of the debtor
 *                           value:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 money:
 *                                   type: number
 *                                   example: 432432
 *                                   description: Amount of money owed by the debtor
 *                                 group:
 *                                   type: string
 *                                   example: "645a61e383d06be08c4252b7"
 *                                   description: ID of the group
 *                           totalValue:
 *                             type: number
 *                             example: 432464
 *                             description: Total amount owed by all debtors
 *                     total:
 *                       type: number
 *                       example: 432517
 *                       description: Total amount owed by all debtors
 *                 creditors:
 *                   type: object
 *                   properties:
 *                     creditors:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           creditor:
 *                             type: string
 *                             example: "6458c6466915e3b80523e0e6"
 *                             description: ID of the creditor
 *                           value:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 money:
 *                                   type: number
 *                                   example: 532
 *                                   description: Amount of money owed to the creditor
 *                                 group:
 *                                   type: string
 *                                   example: "645a61e383d06be08c4252b7"
 *                                   description: ID of the group
 *                           totalValue:
 *                             type: number
 *                             example: 2176
 *                             description: Total amount owed by all creditors
 *                     total:
 *                       type: number
 *                       example: 2176
 *                       description: Total amount owed to all creditors
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
router.get("/:id/report", validateToken, getReport);

export default router;