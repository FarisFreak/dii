import { Request, Response } from "express";
import { loginAuth, loginRoleAuth, menuAuth } from "../services/authService";

export const loginAuthController = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        const auth = await loginAuth({ username, password });

        res.status(200).json({ status: true, message: "OK", data: auth });
    } catch (error: unknown) {
        console.error("Error login:", error);
        if (error instanceof Error)
            res.status(400).json({ status: false, message: error.message });
        else 
            res.status(500).json({ status: false, message: 'Internal server error.' });
    }
}

export const loginRoleAuthController = async (req: Request, res: Response) => {
    try {
        const { roleId } = req.body;
        const userId = res.locals.userId;

        const auth = await loginRoleAuth({ roleId, userId });

        res.status(200).json({ status: true, message: "OK", data: auth });
    } catch (error) {
        console.error("Error auth login:", error);
        if (error instanceof Error)
            res.status(400).json({ status: false, message: error.message });
        else 
            res.status(500).json({ status: false, message: 'Internal server error.' });
    }
}

export const menuAuthController = async (req: Request, res: Response) => {
    try {
        const { userId, roleId } = res.locals;

        const menus = await menuAuth({ roleId, userId });

        res.status(200).json({ status: true, message: "OK", data: menus });
    } catch (error) {
        console.error("Error auth menu:", error);
        if (error instanceof Error)
            res.status(400).json({ status: false, message: error.message });
        else 
            res.status(500).json({ status: false, message: 'Internal server error.' });
    }
}

// export const getRoleAuthController = async (req: Request, res: Response) => {
//     try {
        
//     } catch (error: unknown) {
//         console.error("Error login:", error);
//         if (error instanceof Error)
//             res.status(400).json({ status: false, message: error.message });
//         else 
//             res.status(500).json({ status: false, message: 'Internal server error.' });
//     }
// }