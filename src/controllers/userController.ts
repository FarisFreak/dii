import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { createUser, deleteUser, getAllUsers, getUserById, getUserByUsername, updateUser } from "../services/userService";

dotenv.config();

export const createUserController = async (req: Request, res: Response) => {
    try {
        const { username, password, email, fullname } = req.body;

        const user = await createUser({
            Username: username,
            Password: password,
            Email: email,
            Fullname: fullname
        });
        
        res.status(201).json({ status: true, message: "User created successfully", data: user });
    } catch (error: unknown) {
        console.error("Error creating user:", error);
        if (error instanceof Error)
            res.status(400).json({ status: false, message: error.message });
        else 
            res.status(500).json({ status: false, message: 'Internal server error.' });
    }
}

export const updateUserControler = async (req: Request, res: Response) => {
    try {
        const { id, username, password, email, fullname, isActive } = req.body;

        // if (!user)
        const user = await updateUser(id, {
            Username: username,
            Password: password,
            Email: email,
            Fullname: fullname,
            IsActive: isActive
        });

        res.status(200).json({ status: true, message: "OK", data: user });
    } catch (error: unknown) {
        console.error("Error updating user:", error);
        if (error instanceof Error)
            res.status(400).json({ status: false, message: error.message });
        else
            res.status(500).json({ status: false, message: 'Internal server error.' });
    }
}

export const deleteUserController = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id, 10)

        const user = await deleteUser(userId);

        res.status(200).json({ status: true, message: "OK", data: user });
    } catch (error: unknown) {
        console.error("Error deleting user:", error);
        if (error instanceof Error)
            res.status(400).json({ status: false, message: error.message });
        else
            res.status(500).json({ status: false, message: 'Internal server error.' });
    }
}

export const getUserByIdController = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id, 10);

        const user = await getUserById(userId);

        res.status(200).json({ status: true, message: "OK", data: user });
    } catch (error: unknown) {
        console.error("Error getting user:", error);
        if (error instanceof Error)
            res.status(400).json({ status: false, message: error.message });
        else
            res.status(500).json({ status: false, message: 'Internal server error.' });
    }
}

export const getUserByUsernameController = async (req: Request, res: Response) => {
    try {
        const username = req.params.username;

        const user = await getUserByUsername(username);

        res.status(200).json({ status: true, message: "OK", data: user });
    } catch (error: unknown) {
        console.error("Error getting user:", error);
        if (error instanceof Error)
            res.status(400).json({ status: false, message: error.message });
        else
            res.status(500).json({ status: false, message: 'Internal server error.' });
    }
}

export const getAllUserController = async (reQ: Request, res: Response) => {
    try {
        const users = await getAllUsers();

        res.status(200).json({ status: true, message: "OK", data: users });
    } catch (error) {
        console.error("Error getting user:", error);
        if (error instanceof Error)
            res.status(400).json({ status: false, message: error.message });
        else
            res.status(500).json({ status: false, message: 'Internal server error.' });
    }
}