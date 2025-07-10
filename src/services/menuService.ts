import { initModels } from "../models/init-models";
import { sequelize } from "../config/database";
import MenuVM from "../viewmodels/menuVM";
import { getRoleById } from "./roleService";

const models = initModels(sequelize);

export const createMenu = async (menuData: {
    Code: string;
    Title: string;
    Path?: string;
    ParentMenuId?: number;
}) => {
    const existingMenu = await models.Menus.findOne({
        where: { Code: menuData.Code },
        attributes: ['Code']
    });
    if (existingMenu)
        throw new Error("Menu Code already exists");

    if (menuData.ParentMenuId) {
        const existingParentMenu = await models.Menus.findOne({
            where: { Id: menuData.ParentMenuId, IsDeleted: false },
            attributes: ['Id']
        });
        if (!existingParentMenu)
            throw new Error("Parent menu does not exists");
    }

    const menu = await models.Menus.create({
        ...menuData,
        IsDeleted: false,
        CreatedAt: new Date(),
        UpdatedAt: new Date()
    });

    return MenuVM(menu);
}

export const updateMenu = async (menuId: number, menuData: {
    Code: string;
    Title: string;
    Path?: string;
    ParentMenuId?: number;
    IsActive?: boolean;
}) => {
    const menu = await models.Menus.findByPk(menuId);
    if (!menu || menu.IsDeleted)
        throw new Error("Menu not found");

    if (menuData.Code !== menu.Code) {
        const existingMenu = await models.Menus.findOne({
            where: { Code: menuData.Code }
        });
        if (existingMenu)
            throw new Error("Menu code already exists");

        menu.Code = menuData.Code;
    }

    if (menuData.ParentMenuId !== menu.ParentMenuId) {
        const existingParentMenu = await models.Menus.findByPk(menuData.ParentMenuId);
        if (!existingParentMenu)
            throw new Error("Parent menu does not exists");

        menu.ParentMenuId = menuData.ParentMenuId;
    }

    menu.Title = menuData.Title;
    menu.Path = menuData.Path;
    menu.IsActive = menuData.IsActive ?? false;
    menu.UpdatedAt = new Date();

    await menu.save();

    return MenuVM(menu);
}

export const deleteMenu = async (menuId: number) => {
    const menu = await models.Menus.findByPk(menuId);
    if (!menu || menu.IsDeleted)
        throw new Error("Menu not found");

    menu.IsDeleted = true;
    menu.DeletedAt = new Date();
    menu.UpdatedAt = new Date();
}

export const getMenuById = async (menuId: number) => {
    const menu = await models.Menus.findByPk(menuId);

    if (!menu || menu.IsDeleted)
        throw new Error("Menu not found");

    return MenuVM(menu);
}

export const getMenuByCode = async (code: string) => {
    const menu = await models.Menus.findOne({
        where: { Code: code, IsDeleted: false }
    });
    if (!menu)
        throw new Error("Menu not found");

    return MenuVM(menu);
}

export const getAllMenus = async () => {
    const menus = await models.Menus.findAll({
        where: { IsDeleted: false }
    });

    let _menus = [] as any;
    menus.forEach(menu => {
        _menus.push(MenuVM(menu))
    });

    return _menus;
}