import { Users } from "../models/Users";

interface _UserVM {
    id?: number;
    username: string;
    email: string;
    fullname: string;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

const UserVM = (user: Users): _UserVM => {
    return {
        id: user.Id,
        username: user.Username,
        email: user.Email,
        fullname: user.Fullname,
        isActive: user.IsActive,
        createdAt: user.CreatedAt,
        updatedAt: user.UpdatedAt
    } as _UserVM
}

export default UserVM;