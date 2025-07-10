import express, { NextFunction, Request, Response } from "express";
import { createUserController, deleteUserController, getAllUserController, getUserByIdController, getUserByUsernameController, updateUserControler } from "../controllers/userController";
import { authenticate } from "../middlewares/authMiddleware";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: User
 *     description: Operations related to users
 */

/**
 * @swagger
 * /api/user:
 *  post:
 *      summary: Add a new user
 *      description: Endpoint to add a new user
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          username:
 *                              type: string
 *                              example: johndoe
 *                          password:
 *                              type: string
 *                              example: password123
 *                          fullname:
 *                              type: string
 *                              example: John Doe
 *                          email:
 *                              type: string
 *                              example: john@example.com
 *                          
 *      responses:
 *          200:
 *              description: User added successfully
 *          400: 
 *              description: Failed to add user
 *          500:
 *              description: Internal server error
 */
router.post("/", authenticate as (req: Request, res: Response, next: NextFunction) => void, (req: Request, res: Response) => createUserController(req, res));

/**
 * @swagger
 * /api/user:
 *  put:
 *      summary: Update a user
 *      description: Endpoint to update an existing user
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          id:
 *                              type: integer
 *                              example: 1
 *                          username:
 *                              type: string
 *                              example: johndoe
 *                          password:
 *                              type: string
 *                              example: newpassword123
 *                          fullname:
 *                              type: string
 *                              example: John Doe
 *                          email:
 *                              type: string
 *                              example: john@example.com
 *                          isActive:
 *                              type: boolean
 *                              example: true
 *                          
 *      responses:
 *          200:
 *              description: User updated successfully
 *          400: 
 *              description: Failed to update user
 *          500:
 *              description: Internal server error
 */
router.put("/", authenticate as (req: Request, res: Response, next: NextFunction) => void, (req: Request, res: Response) => updateUserControler(req, res));

/**
 * @swagger
 * /api/user/{id}:
 *  delete:
 *      summary: Delete a user by ID
 *      description: Endpoint to delete a user based on its ID
 *      tags: [User]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *                type: integer
 *            description: ID of the user to delete
 *                          
 *      responses:
 *          200:
 *              description: User deleted successfully
 *          400: 
 *              description: Failed to delete user
 *          500:
 *              description: Internal server error
 */
router.delete("/:id", authenticate as (req: Request, res: Response, next: NextFunction) => void, (req: Request, res: Response) => deleteUserController(req, res));

/**
 * @swagger
 * /api/user/{id}:
 *  get:
 *      summary: Get a user by ID
 *      description: Endpoint to retrieve details of a user based on its ID
 *      tags: [User]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *                type: integer
 *            description: ID of the user
 *                          
 *      responses:
 *          200:
 *              description: User retrieved successfully
 *          400: 
 *              description: User not found
 *          500:
 *              description: Internal server error
 */
router.get("/:id", authenticate as (req: Request, res: Response, next: NextFunction) => void, (req: Request, res: Response) => getUserByIdController(req, res));

/**
 * @swagger
 * /api/user/u/{username}:
 *  get:
 *      summary: Get a user by username
 *      description: Endpoint to retrieve a user based on its username
 *      tags: [User]
 *      parameters:
 *          - in: path
 *            name: username
 *            required: true
 *            schema:
 *                type: string
 *            description: Username of the user
 *                          
 *      responses:
 *          200:
 *              description: User retrieved successfully
 *          400: 
 *              description: User not found
 *          500:
 *              description: Internal server error
 */
router.get("/u/:username", authenticate as (req: Request, res: Response, next: NextFunction) => void, (req: Request, res: Response) => getUserByUsernameController(req, res));

/**
 * @swagger
 * /api/user:
 *  get:
 *      summary: Get all users
 *      description: Endpoint to retrieve a list of all users
 *      tags: [User]
 *                          
 *      responses:
 *          200:
 *              description: List of users retrieved successfully
 *          400: 
 *              description: Failed to retrieve users
 *          500:
 *              description: Internal server error
 */
router.get("/", authenticate as (req: Request, res: Response, next: NextFunction) => void, (req: Request, res: Response) => getAllUserController(req, res));
export default router;