import express, { NextFunction, Request, Response } from "express";
import { loginAuthController, loginRoleAuthController, menuAuthController } from "../controllers/authController";
import { authenticate, authenticateNonRole } from "../middlewares/authMiddleware";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication Operation
 */

/**
 * @swagger
 * /api/auth/login:
 *  post:
 *      summary: User auth login
 *      description: Auth Login
 *      tags: [Auth]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          username:
 *                              type: string
 *                              example: username
 *                          password:
 *                              type: string
 *                              example: password
 *                          
 *      responses:
 *          200:
 *              description: Success login
 *          400: 
 *              description: Failed login
 *          500:
 *              description: Internal error
 */
router.post("/login", (req: Request, res: Response) => loginAuthController(req, res));

/**
 * @swagger
 * /api/auth/login/role:
 *  post:
 *      summary: Role-based user login
 *      description: Auth Login with role verification
 *      tags: [Auth]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          roleId:
 *                              type: integer
 *                              example: 1
 *                          
 *      responses:
 *          200:
 *              description: Success login
 *          400: 
 *              description: Failed login
 *          500:
 *              description: Internal error
 */
router.post("/login/role", authenticateNonRole as (req: Request, res: Response, next: NextFunction) => void, (req: Request, res: Response) => loginRoleAuthController(req, res));

/**
 * @swagger
 * /api/auth/menu:
 *  get:
 *      summary: Get authorized menu
 *      description: Retrieve menu based on user role
 *      tags: [Auth]
 *      responses:
 *          200:
 *              description: Success retrieving menu
 *          400: 
 *              description: Failed retrieving menu
 *          500:
 *              description: Internal error
 */
router.get("/menu", authenticate as (req: Request, res: Response, next: NextFunction) => void, (req: Request, res: Response) => menuAuthController(req, res));
export default router;