import { initModels, Menus, RoleMenu } from "../models/init-models";
import { sequelize } from "../config/database";
import RoleVM from "../viewmodels/roleVm";
import MenuVM from "../viewmodels/menuVM";

const models = initModels(sequelize!);

const _createMenu = async (roleId: number, data: { id: number, grantCreate: boolean, grantUpdate: boolean, grantDelete: boolean }) => {
    try {
        const menuRole = await models.RoleMenu.create({
            MenuId: data.id,
            RoleId: roleId,
            GrantCreate: data.grantCreate,
            GrantDelete: data.grantDelete,
            GrantUpdate: data.grantUpdate,
            IsActive: true,
            IsDeleted: false,
            CreatedAt: new Date(),
            UpdatedAt: new Date()
        });    
    } catch (error: unknown) {
        throw new Error(`Error insert menu role: ${error}`);
    }
}

export const createRole = async (roleData: {
    Name: string;
    Description?: string;
    Code: string;
    Menus?: Array<{
        id: number,
        grantCreate: boolean,
        grantUpdate: boolean,
        grantDelete: boolean
    }>;
}) => {
    const existingRole = await models.Roles.findOne({
        where: { Code: roleData.Code },
        attributes: ['Code']
    })
    if (existingRole)
        throw new Error("Role code already exists");

    const role = await models.Roles.create({
        ...roleData,
        IsDeleted: false,
        CreatedAt: new Date(),
        UpdatedAt: new Date()
    });

    if (roleData.Menus && roleData.Menus.length > 0){        
        for (const menu of roleData.Menus) {
            const existingMenu = await models.Menus.findOne({
                where: { Id: menu.id, IsDeleted: false },
            });

            if (!existingMenu) {
                throw new Error(`Menu with id ${menu.id} does not exist`);
            }

            await _createMenu(role.Id as number, menu);
        }
    }

    return RoleVM(role);
};

export const updateRole = async (roleId: number, roleData: {
    Name: string;
    Description?: string;
    Code: string;
    IsActive: boolean;
    Menus?: Array<{
        id: number,
        grantCreate: boolean,
        grantUpdate: boolean,
        grantDelete: boolean
    }>;
}) => {
    const role = await models.Roles.findByPk(roleId);
    if (!role || role.IsDeleted) {
        throw new Error("Role not found");
    }

    if (roleData.Code !== role.Code) {
        const existingRole = await models.Roles.findOne({
            where: { Code: roleData.Code }
        });
        if (existingRole) {
            throw new Error("Role code already exists");
        }
        role.Code = roleData.Code;
    }

    role.Name = roleData.Name;
    role.Description = roleData.Description;
    role.IsActive = roleData.IsActive;
    role.UpdatedAt = new Date();

    await role.save();

    if (roleData.Menus && roleData.Menus.length > 0){
        for (const menu of roleData.Menus) {
            const existingMenu = await models.Menus.findOne({
                where: { Id: menu.id, IsDeleted: false },
            });

            if (!existingMenu) {
                throw new Error(`Menu with id ${menu.id} does not exist`);
            }
        }

        const currentMenu = await models.RoleMenu.findAll({
            where: { RoleId: roleId, IsDeleted: false },
        });

        const _removed = currentMenu.filter(
            (itemB) =>
                !roleData.Menus?.some(
                    (itemA) => itemA.id === itemB.MenuId
                )
        );

        const _add = roleData.Menus.filter(
            (itemA) =>
                !currentMenu.some(
                    (itemB) => itemA.id === itemB.MenuId
                )
        );

        for (const x of _removed) {
            await models.RoleMenu.destroy({
                where: { MenuId: x.MenuId, RoleId: roleId },
            });
        }

        for (const x of _add) {
            await _createMenu(roleId, {
                id: x.id,
                grantCreate: x.grantCreate,
                grantDelete: x.grantDelete,
                grantUpdate: x.grantUpdate,
            });
        }     
    }

    return RoleVM(role);
};

export const deleteRole = async (roleId: number) => {
    const role = await models.Roles.findByPk(roleId);
    if (!role || role.IsDeleted) {
        throw new Error("Role not found");
    }

    role.IsDeleted = true;
    role.DeletedAt = new Date();
    role.UpdatedAt = new Date();

    await role.save();

    return RoleVM(role);
};

export const getRoleById = async (roleId: number) => {
    const role = await models.Roles.findByPk(roleId, {
        include: [
            {
                model: models.RoleMenu,
                as: 'RoleMenus',
                include: [
                    {
                        model: models.Menus,
                        as: 'Menu'
                    }
                ]
            }
        ]
    });

    if (!role || role.IsDeleted)
        throw new Error("Role not found")

    return RoleVM(role);
};

export const getRoleByCode = async (code: string) => {
    const role = await models.Roles.findOne({
        where: { Code: code, IsDeleted: false }
    });
    if (!role) {
        throw new Error("Role not found");
    }

    return RoleVM(role);
}

export const getAllRoles = async () => {
    const roles = await models.Roles.findAll({
        where: { IsDeleted: false },
        include: [
            {
                model: models.RoleMenu,
                as: 'RoleMenus',
                include: [
                    {
                        model: models.Menus,
                        as: 'Menu'
                    }
                ]
            }
        ]
    });

    let _roles = [] as any;
    roles.forEach(role => {
        _roles.push(RoleVM(role));
    });

    return _roles
};

export const getRoleMenu = async (roleId: number) => {
    const roleMenus = await models.RoleMenu.findAll({
    where: { RoleId: roleId, IsActive: true, IsDeleted: false },
    include: [
      {
        model: Menus,
        as: 'Menu',
        required: true,
        where: { IsActive: true, IsDeleted: false },
      },
    ],
  });
  
  const menus = roleMenus.map((roleMenu) => MenuVM(roleMenu.Menu))

  return menus;
}