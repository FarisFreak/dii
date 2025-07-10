import express, { NextFunction, Request, Response } from "express";
import { createMenuController, deleteMenuController, getAllMenuController, updateMenuController } from "../controllers/menuController";
import { getRoleByIdController, getRoleByCodeController } from "../controllers/roleController";
import { authenticate } from "../middlewares/authMiddleware";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Menu
 *     description: Menu Operation
 */

/**
 * @swagger
 * /api/menu:
 *  post:
 *      summary: Add new menu
 *      description: Add a new menu item
 *      tags: [Menu]
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
 *                          title:
 *                              type: string
 *                              example: Dashboard
 *                          path:
 *                              type: string
 *                              example: /dashboard
 *                              nullable: true
 *                          parentMenuId:
 *                              type: integer
 *                              example: 1
 *                              nullable: true
 *                          
 *      responses:
 *          200:
 *              description: Success adding menu
 *          400: 
 *              description: Failed adding menu
 *          500:
 *              description: Internal error
 */
router.post("/", authenticate as (req: Request, res: Response, next: NextFunction) => void, (req: Request, res: Response) => createMenuController(req, res));

/**
 * @swagger
 * /api/menu:
 *  put:
 *      summary: Update menu
 *      description: Update an existing menu item
 *      tags: [Menu]
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
 *                          title:
 *                              type: string
 *                              example: Dashboard
 *                          path:
 *                              type: string
 *                              example: /dashboard
 *                              nullable: true
 *                          parentMenuId:
 *                              type: integer
 *                              example: 1
 *                              nullable: true
 *                          isActive:
 *                              type: boolean
 *                              example: true
 *                          
 *      responses:
 *          200:
 *              description: Success updating menu
 *          400: 
 *              description: Failed updating menu
 *          500:
 *              description: Internal error
 */
router.put("/", authenticate as (req: Request, res: Response, next: NextFunction) => void, (req: Request, res: Response) => updateMenuController(req, res));

/**
 * @swagger
 * /api/menu/{id}:
 *  delete:
 *      summary: Delete menu by ID
 *      description: Delete a menu item by its ID
 *      tags: [Menu]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *                type: integer
 *            description: ID of the menu to delete
 *                          
 *      responses:
 *          200:
 *              description: Success deleting menu
 *          400: 
 *              description: Failed deleting menu
 *          500:
 *              description: Internal error
 */
router.delete("/:id", authenticate as (req: Request, res: Response, next: NextFunction) => void, (req: Request, res: Response) => deleteMenuController(req, res));

/**
 * @swagger
 * /api/menu/{id}:
 *  get:
 *      summary: Get menu by ID
 *      description: Retrieve a menu item by its ID
 *      tags: [Menu]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *                type: integer
 *            description: ID of the menu to retrieve
 *                          
 *      responses:
 *          200:
 *              description: Success retrieving menu
 *          400: 
 *              description: Failed retrieving menu
 *          500:
 *              description: Internal error
 */
router.get("/:id", authenticate as (req: Request, res: Response, next: NextFunction) => void, (req: Request, res: Response) => getRoleByIdController(req, res));

/**
 * @swagger
 * /api/menu/code/{code}:
 *  get:
 *      summary: Get menu by code
 *      description: Retrieve a menu item by its code
 *      tags: [Menu]
 *      parameters:
 *          - in: path
 *            name: code
 *            required: true
 *            schema:
 *                type: integer
 *            description: Code of the menu to retrieve
 *                          
 *      responses:
 *          200:
 *              description: Success retrieving menu
 *          400: 
 *              description: Failed retrieving menu
 *          500:
 *              description: Internal error
 */
router.get("/code/:code", authenticate as (req: Request, res: Response, next: NextFunction) => void, (req: Request, res: Response) => getRoleByCodeController(req, res));

/**
 * @swagger
 * /api/menu:
 *  get:
 *      summary: Get all menus
 *      description: Retrieve a list of all menu items
 *      tags: [Menu]
 *                          
 *      responses:
 *          200:
 *              description: Success retrieving menu list
 *          400: 
 *              description: Failed retrieving menu list
 *          500:
 *              description: Internal error
 */
router.get("/", authenticate as (req: Request, res: Response, next: NextFunction) => void, (req: Request, res: Response) => getAllMenuController(req, res));
export default router;