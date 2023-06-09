import express from "express";
import {
    createOutgoing,
    updateOutgoing, 
    getOutgoing } from "../controllers/outgoings.js";
import { validateToken } from "../middleware/auth.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Outgoings
 *  description: API to handle outgoings
 */

/* CREATE */

/**
 * @swagger
 * /api/v1/outgoings/:
 *   post:
 *     summary: Create a new outgoing
 *     description: Create a new outgoing in the current group
 *     tags: 
 *       - Outgoings
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - value
 *               - paidBy
 *               - users
 *               - group
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Test outgoing"      
 *                 description: The name of the outgoing
 *               description:
 *                 type: string
 *                 example: "This is a test outgoing"
 *                 description: The description of the outgoing
 *               value:
 *                 type: number
 *                 example: "45.50"
 *                 description: The value of the outgoing
 *               paidBy:
 *                 type: string
 *                 example: "60b9e0b3e6b0f2a0b4f5e0b3"
 *                 description: The id of the user who paid the outgoing
 *               users:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: string
 *                       example: "60b9e0b3e6b0f2a0b4f5e0b3" 
 *                       description: The id of the user who is involved in the outgoing
 *                     value:
 *                       type: number
 *                       example: "45.50"
 *                       description: The value of the outgoing for the user  
 *               group:
 *                 type: string
 *                 example: "60b9e0b3e6b0f2a0b4f5e0b3"
 *                 description: The id of the group where the outgoing is created
 *               periodicity:
 *                 type: object
 *                 properties:
 *                   isPeriodic:
 *                     type: boolean
 *                     example: true
 *                     description: If the outgoing is periodic or not 
 *                   period:
 *                     type: number
 *                     example: 1
 *                     description: The period of the outgoing                             
 *               tag:
 *                 type: string
 *                 example: "food"    
 *                 description: The tag of the outgoing
 *                 
 *     responses:
 *       201:
 *         description: Outgoing created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "Test outgoing"      
 *                   description: The name of the outgoing
 *                 description:
 *                   type: string
 *                   example: "This is a test outgoing"
 *                   description: The description of the outgoing
 *                 value:
 *                   type: number
 *                   example: "45.50"
 *                   description: The value of the outgoing
 *                 paidBy:
 *                   type: string
 *                   example: "60b9e0b3e6b0f2a0b4f5e0b3"
 *                   description: The id of the user who paid the outgoing
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       user:
 *                         type: string
 *                         example: "60b9e0b3e6b0f2a0b4f5e0b3" 
 *                         description: The id of the user who is involved in the outgoing
 *                       value:
 *                         type: number
 *                         example: "45.50"
 *                         description: The value of the outgoing for the user  
 *                 group:
 *                   type: string
 *                   example: "60b9e0b3e6b0f2a0b4f5e0b3"
 *                   description: The id of the group where the outgoing is created
 *                 periodicity:
 *                   type: object
 *                   properties:
 *                     isPeriodic:
 *                       type: boolean
 *                       example: true
 *                       description: If the outgoing is periodic or not 
 *                     period:
 *                       type: number
 *                       example: 1
 *                       description: The period of the outgoing                             
 *                 tag:
 *                   type: string
 *                   example: "food"    
 *                   description: The tag of the outgoing
 *       
 *       400:
 *         description: Bad request, some of the required fields are missing, the value is not a number or the user is not in the group. In essence the outgoing is not valid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Email already exists"
 *                   description: Email of the user already exists
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
 *         description: User or group not found
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
router.post("/", validateToken, createOutgoing);

/* UPDATE */

/**
 * @swagger
 * /api/v1/outgoings/:id:
 *   put:
 *     summary: Update an existing outgoing
 *     description: Update an existing outgoing in the current group
 *     tags: 
 *       - Outgoings
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         description: The ID of the outgoing to edit.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - value
 *               - paidBy
 *               - users
 *               - group
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Test outgoing"      
 *                 description: The name of the outgoing
 *               description:
 *                 type: string
 *                 example: "This is a test outgoing"
 *                 description: The description of the outgoing
 *               value:
 *                 type: number
 *                 example: "45.50"
 *                 description: The value of the outgoing
 *               paidBy:
 *                 type: string
 *                 example: "60b9e0b3e6b0f2a0b4f5e0b3"
 *                 description: The id of the user who paid the outgoing
 *               users:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: string
 *                       example: "60b9e0b3e6b0f2a0b4f5e0b3" 
 *                       description: The id of the user who is involved in the outgoing
 *                     value:
 *                       type: number
 *                       example: "45.50"
 *                       description: The value of the outgoing for the user  
 *               group:
 *                 type: string
 *                 example: "60b9e0b3e6b0f2a0b4f5e0b3"
 *                 description: The id of the group where the outgoing is created
 *               periodicity:
 *                 type: object
 *                 properties:
 *                   isPeriodic:
 *                     type: boolean
 *                     example: true
 *                     description: If the outgoing is periodic or not 
 *                   period:
 *                     type: number
 *                     example: 1
 *                     description: The period of the outgoing                             
 *               tag:
 *                 type: string
 *                 example: "food"    
 *                 description: The tag of the outgoing
 *               isPaid:
 *                 type: boolean
 *                 example: true
 *                 description: If the outgoing is paid or not
 *                 
 *     responses:
 *       200:
 *         description: Outgoing edited successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "Test outgoing"      
 *                   description: The name of the outgoing
 *                 description:
 *                   type: string
 *                   example: "This is a test outgoing"
 *                   description: The description of the outgoing
 *                 value:
 *                   type: number
 *                   example: "45.50"
 *                   description: The value of the outgoing
 *                 paidBy:
 *                   type: string
 *                   example: "60b9e0b3e6b0f2a0b4f5e0b3"
 *                   description: The id of the user who paid the outgoing
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       user:
 *                         type: string
 *                         example: "60b9e0b3e6b0f2a0b4f5e0b3" 
 *                         description: The id of the user who is involved in the outgoing
 *                       value:
 *                         type: number
 *                         example: "45.50"
 *                         description: The value of the outgoing for the user  
 *                 group:
 *                   type: string
 *                   example: "60b9e0b3e6b0f2a0b4f5e0b3"
 *                   description: The id of the group where the outgoing is created
 *                 periodicity:
 *                   type: object
 *                   properties:
 *                     isPeriodic:
 *                       type: boolean
 *                       example: true
 *                       description: If the outgoing is periodic or not 
 *                     period:
 *                       type: number
 *                       example: 1
 *                       description: The period of the outgoing                             
 *                 tag:
 *                   type: string
 *                   example: "food"    
 *                   description: The tag of the outgoing
 *                 isPaid:
 *                   type: boolean
 *                   example: true
 *                   description: If the outgoing is paid or not
 *       
 *       400:
 *         description: Bad request, some of the required fields are missing, the value is not a number or the user is not in the group. In essence the outgoing is not valid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Value is not a number"
 *                   description: Value is not a number
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
 *         description: User or group not found
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
router.put("/:id", validateToken, updateOutgoing);

/**
 * @swagger
 * /api/v1/outgoings/:id:
 *   get:
 *     summary: Get an outgoing by id
 *     description: Get an outgoing by id
 *     tags: 
 *       - Outgoings
 *     produces:
 *       - application/json
 *     security:
 *       - jwt: []
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         description: Id of the outgoing
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
 *                 name:
 *                   type: string
 *                   example: "Test outgoing"      
 *                   description: The name of the outgoing
 *                 description:
 *                   type: string
 *                   example: "This is a test outgoing"
 *                   description: The description of the outgoing
 *                 value:
 *                   type: number
 *                   example: "45.50"
 *                   description: The value of the outgoing
 *                 paidBy:
 *                   type: string
 *                   example: "60b9e0b3e6b0f2a0b4f5e0b3"
 *                   description: The id of the user who paid the outgoing
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       user:
 *                         type: string
 *                         example: "60b9e0b3e6b0f2a0b4f5e0b3" 
 *                         description: The id of the user who is involved in the outgoing
 *                       value:
 *                         type: number
 *                         example: "45.50"
 *                         description: The value of the outgoing for the user  
 *                 group:
 *                   type: string
 *                   example: "60b9e0b3e6b0f2a0b4f5e0b3"
 *                   description: The id of the group where the outgoing is created
 *                 periodicity:
 *                   type: object
 *                   properties:
 *                     isPeriodic:
 *                       type: boolean
 *                       example: true
 *                       description: If the outgoing is periodic or not 
 *                     period:
 *                       type: number
 *                       example: 1
 *                       description: The period of the outgoing                             
 *                 tag:
 *                   type: string
 *                   example: "food"    
 *                   description: The tag of the outgoing                 
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
 *         description: Outgoing not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Outgoing not found"                           
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
router.get("/:id", validateToken, getOutgoing);


export default router;
