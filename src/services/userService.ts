import { initModels } from "../models/init-models";
import { sequelize } from "../config/database";
import bcrypt from 'bcryptjs';
import UserVM from "../viewmodels/userVm";

const models = initModels(sequelize!);

const _createRole = async (roleId: number, userId: number) => {
    try {
        const userRole = await models.UserRole.create({
            UserId: userId,
            RoleId: roleId
        });
    } catch (error) {
        throw new Error(`Error insert user role: ${error}`);
    }
}

export const createUser = async (userData: {
    Username: string;
    Password: string;
    Email: string;
    Fullname: string;
    Roles?: Array<number>;
}) => {
    const existingUser = await models.Users.findOne({
        where: { Username: userData.Username },
        attributes: ['Username']
    });
    if (existingUser)
        throw new Error("Username already exists");

    const existingEmail = await models.Users.findOne({
        where: { Email: userData.Email }
    });
    if (existingEmail)
        throw new Error("Email already exists");
    
    const hashedPassword = await bcrypt.hash(userData.Password, 10);
    const user = await models.Users.create({
        ...userData,
        Password: hashedPassword,
        IsDeleted: false,
        CreatedAt: new Date(),
        UpdatedAt: new Date(),
    });

    if (userData.Roles && userData.Roles.length > 0) {
        for (const role of userData.Roles) {
            const existingRole = await models.Roles.findOne({
                where: { Id: role, IsDeleted: false }
            });

            if (!existingRole)
                throw new Error(`Role with id ${role} does not exist`);

            await _createRole(role, user.Id as number)
        }
    }

    return UserVM(user);
};

export const updateUser = async (userId: number, userData: {
    Username: string;
    Password?: string;
    Email: string;
    Fullname: string;
    IsActive: boolean;
    Roles?: Array<number>;
}) => {
    const user = await models.Users.findByPk(userId);
    if (!user || user.IsDeleted) {
        throw new Error("User not found");
    }
    if (userData.Username != user.Username) {
        const existingUser = await models.Users.findOne({
            where: { Username: userData.Username }
        });
        if (existingUser)
            throw new Error("Username already exists");

        user.Username = userData.Username;
    }

    if (userData.Email != user.Email) {
        const existingEmail = await models.Users.findOne({
            where: { Email: userData.Email }
        });
        if (existingEmail)
            throw new Error("Email already exists");

        user.Email = userData.Email;
    }

    if (userData.Password)
        user.Password = await bcrypt.hash(userData.Password, 10);

    user.Fullname = userData.Fullname;
    user.IsActive = userData.IsActive;
    user.UpdatedAt = new Date();

    await user.save();

    if (userData.Roles && userData.Roles.length > 0) {
        for (const role of userData.Roles) {
            const existingRole = await models.Roles.findOne({
                where: { Id: role, IsDeleted: false }
            });

            if (!existingRole)
                throw new Error(`Role with id ${role} does not exist`);
        }

        const currentRole = await models.UserRole.findAll({
            where: { UserId: userId }
        })

        const _removed = currentRole.filter(
            (itemB) =>
                !userData.Roles?.some(
                    (itemA) => itemA === itemB.RoleId
                )
        )

        const _add = userData.Roles.filter(
            (itemA) =>
                !currentRole.some(
                    (itemB) => itemA === itemB.RoleId
                )
        )

        for (const x of _removed) {
            await models.UserRole.destroy({
                where: { UserId: userId, RoleId: x.RoleId }
            })
        }

        for (const x of _add) {
            await _createRole(x, userId);
        }
    }

    return UserVM(user);
}

export const deleteUser = async (userId: number) => {
    const user = await models.Users.findByPk(userId);
    if (!user) {
        throw new Error("User not found");
    }
    user.IsDeleted = true;
    user.UpdatedAt = new Date();
    user.DeletedAt = new Date();

    await user.save();

    return UserVM(user);
};

export const getUserById = async (userId: number) => {
    const user = await models.Users.findByPk(userId, {
        include: [
            {
                model: models.UserRole,
                as: 'UserRoles',
                include: [
                    {
                        model: models.Roles,
                        as: 'Role'
                    }
                ]
            }
        ],
    });

    if (!user || user.IsDeleted)
        throw new Error("User not found");

    return UserVM(user);
};

export const getUserByUsername = async (username: string) => {
    const user = await models.Users.findOne({
        where: { Username: username, IsDeleted: false },
        include: [
            {
                model: models.UserRole,
                as: 'UserRoles',
                include: [
                    {
                        model: models.Roles,
                        as: 'Role'
                    }
                ]
            }
        ]
    });
    if (!user) {
        throw new Error("User not found");
    }

    return UserVM(user);
};

export const getAllUsers = async () => {
    const users = await models.Users.findAll({
        where: { IsDeleted: false },
        order: [['CreatedAt', 'DESC']]
    });

    let _users = [] as any;
    users.forEach(user => {
        _users.push(UserVM(user));
    });
    
    return _users;
};