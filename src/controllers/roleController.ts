import dotenv from "dotenv";
import { Request, Response } from "express";
import { createRole, deleteRole, getAllRoles, getRoleByCode, getRoleById, getRoleMenu, updateRole } from "../services/roleService";

dotenv.config();

export const createRoleController = async (req: Request, res: Response) => {
    try {
        const { code, name, description, menus } = req.body;

        const role = await createRole({
            Code: code,
            Name: name,
            Description: description,
            Menus: menus ?? null
        });

        res.status(201).json({ status: true, message: "role created successfully", data: role });
    } catch (error: unknown) {
        console.error("Error creating role:", error);
        if (error instanceof Error)
            res.status(400).json({ status: false, message: error.message });
        else 
            res.status(500).json({ status: false, message: 'Internal server error.' });
    }
}

export const updateRoleController = async (req: Request, res: Response) => {
    try {
        const { id, code, name, description, isActive, menus } = req.body;

        console.log('DEBUG :', req.body);

        const role = await updateRole(id, {
            Code: code,
            Name: name,
            Description: description,
            IsActive: isActive,
            Menus: menus
        });

        res.status(200).json({ status: true, message: "OK", data: role });
    } catch (error: unknown) {
        console.error("Error updating role:", error);
        if (error instanceof Error)
            res.status(400).json({ status: false, message: error.message });
        else 
            res.status(500).json({ status: false, message: 'Internal server error.' });
    }
}

export const deleteRoleController = async (req: Request, res: Response) => {
    try {
        const roleId = parseInt(req.params.id, 10);

        const role = await deleteRole(roleId);

        res.status(200).json({ status: true, message: "OK", data: role });
    } catch (error: unknown) {
        console.error("Error deleting role:", error);
        if (error instanceof Error)
            res.status(400).json({ status: false, message: error.message });
        else 
            res.status(500).json({ status: false, message: 'Internal server error.' });
    }
}

export const getRoleByIdController = async (req: Request, res: Response) => {
    try {
        const roleId = parseInt(req.params.id, 10);

        const role = await getRoleById(roleId);

        res.status(200).json({ status: true, message: "OK", data: role });
    } catch (error: unknown) {
        console.error("Error getting role:", error);
        if (error instanceof Error)
            res.status(400).json({ status: false, message: error.message });
        else
            res.status(500).json({ status: false, message: 'Internal server error.' });
    }
}

export const getRoleByCodeController = async (req: Request, res: Response) => {
    try {
        const code = req.params.code;

        const role = await getRoleByCode(code);

        res.status(200).json({ status: true, message: "OK", data: role });
    } catch (error: unknown) {
        console.error("Error getting role:", error);
        if (error instanceof Error)
            res.status(400).json({ status: false, message: error.message });
        else
            res.status(500).json({ status: false, message: 'Internal server error.' });
    }
}

export const getAllRoleController = async (req: Request, res: Response) => {
    try {
        const roles = await getAllRoles();

        res.status(200).json({ status: true, message: "OK", data: roles });
    } catch (error: unknown) {
        console.error("Error getting role:", error);
        if (error instanceof Error)
            res.status(400).json({ status: false, message: error.message });
        else
            res.status(500).json({ status: false, message: 'Internal server error.' });
    }
}

export const getRoleMenuController = async (req: Request, res: Response) => {
    try {
        const roleId = parseInt(req.params.id, 10);

        const menus = await getRoleMenu(roleId);

        res.status(200).json({ status: true, message: "OK", data: menus });

    } catch (error: unknown) {
        console.error("Error getting role:", error);
        if (error instanceof Error)
            res.status(400).json({ status: false, message: error.message });
        else
            res.status(500).json({ status: false, message: 'Internal server error.' });
    }
}