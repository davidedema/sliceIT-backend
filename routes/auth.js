import express from 'express';
import { registerUser, loginUser } from '../controllers/auth.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Authentication
 *  description: API to handle authentication
 */


/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user
 *     tags: 
 *       - Authentication
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
 *               - email
 *               - nickname
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "example@example.com"      
 *                 description: Email of the user
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "password"
 *                 description: Password of the user
 *               nickname:
 *                 type: string
 *                 example: "nickname"
 *     responses:
 *       201:
 *         description: User created
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
 *       
 *       400:
 *         description: Bad request, email or nickname already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Email already exists"
 *                   description: Email of the user already exists
 *       
 *       400: 
 *         description: Bad request, missing required fields
 *         content:
 *           application/json:
 *             schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Missing required fields"
 *                 description: Missing required fields        
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
router.post("/register", registerUser);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Authenticate a user
 *     description: Login to the application, and provides a bearer token, that will be used throughout every other request.
 *     tags: 
 *       - Authentication
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
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "example@example.com"      
 *                 description: Email of the user
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "password"
 *                 description: Password of the user
 *     responses:
 *       200:
 *         description: Returns a token, to be used with the rest of the application.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       example: "exampleATexample.com"      
 *                       description: Email of the user
 *                     password:
 *                       type: string
 *                       format: password
 *                       example: "password"
 *                       description: Password of the user
 *                     nickname:
 *                       type: string
 *                       example: "nickname"
 *                       description: The user who logged in object
 *                 token:
 *                   type: string
 *                   example: "jwtToken"      
 *                   description: The bearer token to be used with the rest of the application.
 *       
 *       400:
 *         description: Bad request, email or password is incorrect
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Email do not exists"
 *                   description: Email of the user do not exists
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
router.post("/login", loginUser);


export default router;