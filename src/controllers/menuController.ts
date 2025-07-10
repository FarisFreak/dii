import { Request, Response } from "express";
import { createMenu, deleteMenu, getAllMenus, getMenuByCode, getMenuById, updateMenu } from "../services/menuService";

export const createMenuController = async (req: Request, res: Response) => {
    try {
        const { code, title, path, parentMenuId } = req.body;

        const menu = await createMenu({
            Code: code,
            Title: title,
            Path: path,
            ParentMenuId: parentMenuId
        });

        res.status(201).json({ status: true, message: "menu created successfully", data: menu });
    } catch (error: unknown) {
        console.error("Error creating menu:", error);
        if (error instanceof Error)
            res.status(400).json({ status: false, message: error.message });
        else 
            res.status(500).json({ status: false, message: 'Internal server error.' });
    }
}

export const updateMenuController = async (req: Request, res: Response) => {
    try {
        const menuId = parseInt(req.body.id, 10);

        const { code, title, path, parentMenuId, isActive } = req.body;

        const menu = await updateMenu(menuId, {
            Code: code,
            Title: title,
            Path: path ?? null,
            ParentMenuId: parentMenuId ? parseInt(parentMenuId, 10) : undefined,
            IsActive: isActive
        });

        res.status(200).json({ status: true, message: "menu updated successfully", data: menu });
    } catch (error: unknown) {
        console.error("Error updating menu:", error);
        if (error instanceof Error)
            res.status(400).json({ status: false, message: error.message });
        else 
            res.status(500).json({ status: false, message: 'Internal server error.' });
    }
}

export const deleteMenuController = async (req: Request, res: Response) => {
    try {
        const menuId = parseInt(req.params.id, 10);

        const menu = await deleteMenu(menuId);

        res.status(200).json({ status: true, message: "menu deleted successfully", data: menu });
    } catch (error: unknown) {
        console.error("Error deleting role:", error);
        if (error instanceof Error)
            res.status(400).json({ status: false, message: error.message });
        else 
            res.status(500).json({ status: false, message: 'Internal server error.' });
    }
}

export const getMenuByIdController = async (req: Request, res: Response) => {
    try {
        const menuId = parseInt(req.params.id, 10);

        const menu = await getMenuById(menuId);

        res.status(200).json({ status: true, message: "OK", data: menu });
    } catch (error: unknown) {
        console.error("Error getting role:", error);
        if (error instanceof Error)
            res.status(400).json({ status: false, message: error.message });
        else 
            res.status(500).json({ status: false, message: 'Internal server error.' });
    }
}

export const getMenuByCodeController = async (req: Request, res: Response) => {
    try {
        const code = req.params.code;

        const menu = await getMenuByCode(code);

        res.status(200).json({ status: true, message: "OK", data: menu });
    } catch (error: unknown) {
        console.error("Error getting role:", error);
        if (error instanceof Error)
            res.status(400).json({ status: false, message: error.message });
        else 
            res.status(500).json({ status: false, message: 'Internal server error.' });
    }
}

export const getAllMenuController = async (req: Request, res: Response) => {
    try {
        const menus = await getAllMenus();

        res.status(200).json({ status: true, message: "OK", data: menus });
    } catch (error: unknown) {
        console.error("Error getting role:", error);
        if (error instanceof Error)
            res.status(400).json({ status: false, message: error.message });
        else 
            res.status(500).json({ status: false, message: 'Internal server error.' });
    }
}