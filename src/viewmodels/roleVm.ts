import { Roles } from "../models/Roles";

interface _RoleVM {
    id?: number;
    code: string;
    name: string;
    description?: string;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

const RoleVM = (role: Roles): _RoleVM => {
    return {
        id: role.Id,
        code: role.Code,
        name: role.Name,
        description: role.Description,
        isActive: role.IsActive,
        createdAt: role.CreatedAt,
        updatedAt: role.UpdatedAt
    } as _RoleVM
}

export default RoleVM;