import express from "express";
import {
    createOutgoing,
    updateOutgoing,
} from "../controllers/outgoings.js";
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
 *         description: Bad request, some of the required fields are missing, the value is not a number or the user is not in the group
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

router.put("/:id", validateToken, updateOutgoing);

export default router;
