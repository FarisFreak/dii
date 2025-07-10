import { Menus } from "../models/Menus";

interface _MenuVM {
    id?: number;
    code: string;
    title: string;
    path?: string;
    parentMenuId?: number;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

const MenuVM = (menu: Menus): _MenuVM => {
    return {
        id: menu.Id,
        code: menu.Code,
        title: menu.Title,
        path: menu.Path,
        parentMenuId: menu.ParentMenuId,
        isActive: menu.IsActive,
        createdAt: menu.CreatedAt,
        updatedAt: menu.UpdatedAt
    } as _MenuVM
}

export default MenuVM;