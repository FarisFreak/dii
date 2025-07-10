import { initModels, RoleMenu, Roles, UserRole } from "../models/init-models";
import { sequelize } from "../config/database";
import bcrypt  from "bcryptjs";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import MenuVM from "../viewmodels/menuVM";

dotenv.config();

const models = initModels(sequelize);

export const loginAuth = async (authData: {
    username: string;
    password: string;
}) => {
    const user = await models.Users.findOne({
        where: { Username: authData.username, IsDeleted: false }
    });

    if (!user) throw new Error("Invalid username / password");

    const isMatch = await bcrypt.compare(authData.password, user.Password);
    if (!isMatch) throw new Error("Invalid username / password");

    if (!user.IsActive) throw new Error("User not active");

    const token = jwt.sign({ userId: user.Id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    return { token };
}

export const loginRoleAuth = async (authData: {
    roleId: number;
    userId: number;
}) => {
    const role = await models.Roles.findOne({
        where: { Id: authData.roleId, IsActive: true, IsDeleted: false },
        include: [
            {
                model: UserRole,
                as: 'UserRoles',
                required: true,
                where: { UserId: authData.userId },
            },
        ]
    })

    if (!role)
        throw new Error("Invalid role");

    const token = jwt.sign({ userId: authData.userId, roleId: authData.roleId }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    return { token };
}

export const menuAuth = async(authData: {
    roleId: number, 
    userId: number}) => {
        const menus = await models.Menus.findAll({
            where: { IsActive: true },
            include: [
                {
                    model: models.RoleMenu,
                    as: 'RoleMenus', 
                    required: false, 
                    where: { RoleId: authData.roleId },
                    include: [
                        {
                            model: models.Roles,
                            as: 'Role',
                            required: false,
                            where: { IsActive: true },
                            include: [
                                {
                                    model: models.UserRole,
                                    as: 'UserRoles',
                                    required: false,
                                    include: [
                                        {
                                            model: models.Users,
                                            as: 'User',
                                            required: false,
                                            where: { Id: authData.userId, IsActive: true },
                                        },
                                    ],
                                },
                            ]
                        }
                    ],
                },
            ],
        });

        return menus.map(x => MenuVM(x));
}