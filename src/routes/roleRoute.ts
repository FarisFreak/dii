import express, { NextFunction, Request, Response } from "express";
import { createRoleController, deleteRoleController, getAllRoleController, getRoleByCodeController, getRoleByIdController, getRoleMenuController, updateRoleController } from "../controllers/roleController";
import { authenticate } from "../middlewares/authMiddleware";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Role
 *     description: Operations related to roles
 */

/**
 * @swagger
 * /api/role:
 *  post:
 *      summary: Add a new role
 *      description: Endpoint to add a new role along with associated menus
 *      tags: [Role]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          code:
 *                              type: integer
 *                              example: 101
 *                          name:
 *                              type: string
 *                              example: Admin Role
 *                          description:
 *                              type: string
 *                              example: Role for administrators
 *                              nullable: true
 *                          menus:
 *                              type: array
 *                              items:
 *                                  type: object
 *                                  properties:
 *                                      id:
 *                                          type: integer
 *                                          example: 1
 *                                      grantCreate:
 *                                          type: boolean
 *                                          example: true
 *                                      grantUpdate:
 *                                          type: boolean
 *                                          example: true
 *                                      grantDelete:
 *                                          type: boolean
 *                                          example: true
 *                              nullable: true
 *                          
 *      responses:
 *          200:
 *              description: Role added successfully
 *          400: 
 *              description: Failed to add role
 *          500:
 *              description: Internal server error
 */
router.post("/", authenticate as (req: Request, res: Response, next: NextFunction) => void, (req: Request, res: Response) => createRoleController(req, res));

/**
 * @swagger
 * /api/role:
 *  put:
 *      summary: Update a role
 *      description: Endpoint to update an existing role along with associated menus
 *      tags: [Role]
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
 *                          code:
 *                              type: integer
 *                              example: 101
 *                          name:
 *                              type: string
 *                              example: Admin Role
 *                          description:
 *                              type: string
 *                              example: Role for administrators
 *                              nullable: true
 *                          menus:
 *                              type: array
 *                              items:
 *                                  type: object
 *                                  properties:
 *                                      id:
 *                                          type: integer
 *                                          example: 1
 *                                      grantCreate:
 *                                          type: boolean
 *                                          example: true
 *                                      grantUpdate:
 *                                          type: boolean
 *                                          example: true
 *                                      grantDelete:
 *                                          type: boolean
 *                                          example: true
 *                              nullable: true
 *                          
 *      responses:
 *          200:
 *              description: Role updated successfully
 *          400: 
 *              description: Failed to update role
 *          500:
 *              description: Internal server error
 */
router.put("/", authenticate as (req: Request, res: Response, next: NextFunction) => void, (req: Request, res: Response) => updateRoleController(req, res));

/**
 * @swagger
 * /api/role/{id}:
 *  delete:
 *      summary: Delete a role by ID
 *      description: Endpoint to delete a role based on its ID
 *      tags: [Role]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *                type: integer
 *            description: ID of the role to delete
 *                          
 *      responses:
 *          200:
 *              description: Role deleted successfully
 *          400: 
 *              description: Failed to delete role
 *          500:
 *              description: Internal server error
 */
router.delete("/:id", authenticate as (req: Request, res: Response, next: NextFunction) => void, (req: Request, res: Response) => deleteRoleController(req, res));

/**
 * @swagger
 * /api/role/{id}:
 *  get:
 *      summary: Get a role by ID
 *      description: Endpoint to retrieve details of a role based on its ID
 *      tags: [Role]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *                type: integer
 *            description: ID of the role
 *                          
 *      responses:
 *          200:
 *              description: Role retrieved successfully
 *          400: 
 *              description: Role not found
 *          500:
 *              description: Internal server error
 */
router.get("/:id", authenticate as (req: Request, res: Response, next: NextFunction) => void, (req: Request, res: Response) => getRoleByIdController(req, res));

/**
 * @swagger
 * /api/role/code/{code}:
 *  get:
 *      summary: Get a role by code
 *      description: Endpoint to retrieve a role based on its code
 *      tags: [Role]
 *      parameters:
 *          - in: path
 *            name: code
 *            required: true
 *            schema:
 *                type: integer
 *            description: Code of the role
 *                          
 *      responses:
 *          200:
 *              description: Role retrieved successfully
 *          400: 
 *              description: Role not found
 *          500:
 *              description: Internal server error
 */
router.get("/code/:code", authenticate as (req: Request, res: Response, next: NextFunction) => void, (req: Request, res: Response) => getRoleByCodeController(req, res));

/**
 * @swagger
 * /api/role:
 *  get:
 *      summary: Get all roles
 *      description: Endpoint to retrieve a list of all roles
 *      tags: [Role]
 *                          
 *      responses:
 *          200:
 *              description: List of roles retrieved successfully
 *          400: 
 *              description: Failed to retrieve roles
 *          500:
 *              description: Internal server error
 */
router.get("/", authenticate as (req: Request, res: Response, next: NextFunction) => void, (req: Request, res: Response) => getAllRoleController(req, res));

/**
 * @swagger
 * /api/role/{id}/menu:
 *  get:
 *      summary: Get menus by role ID
 *      description: Endpoint to retrieve menus associated with a specific role
 *      tags: [Role]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *                type: integer
 *            description: ID of the role
 *                          
 *      responses:
 *          200:
 *              description: Menus retrieved successfully
 *          400: 
 *              description: Menus not found
 *          500:
 *              description: Internal server error
 */
router.get("/:id/menu", authenticate as (req: Request, res: Response, next: NextFunction) => void, (req: Request, res: Response) => getRoleMenuController(req, res));
export default router;