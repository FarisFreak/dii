import type { Sequelize } from "sequelize";
import { Menus as _Menus } from "./Menus";
import type { MenusAttributes, MenusCreationAttributes } from "./Menus";
import { RoleMenu as _RoleMenu } from "./RoleMenu";
import type { RoleMenuAttributes, RoleMenuCreationAttributes } from "./RoleMenu";
import { Roles as _Roles } from "./Roles";
import type { RolesAttributes, RolesCreationAttributes } from "./Roles";
import { UserRole as _UserRole } from "./UserRole";
import type { UserRoleAttributes, UserRoleCreationAttributes } from "./UserRole";
import { Users as _Users } from "./Users";
import type { UsersAttributes, UsersCreationAttributes } from "./Users";

export {
  _Menus as Menus,
  _RoleMenu as RoleMenu,
  _Roles as Roles,
  _UserRole as UserRole,
  _Users as Users,
};

export type {
  MenusAttributes,
  MenusCreationAttributes,
  RoleMenuAttributes,
  RoleMenuCreationAttributes,
  RolesAttributes,
  RolesCreationAttributes,
  UserRoleAttributes,
  UserRoleCreationAttributes,
  UsersAttributes,
  UsersCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const Menus = _Menus.initModel(sequelize);
  const RoleMenu = _RoleMenu.initModel(sequelize);
  const Roles = _Roles.initModel(sequelize);
  const UserRole = _UserRole.initModel(sequelize);
  const Users = _Users.initModel(sequelize);

  Menus.belongsTo(Menus, { as: "ParentMenu", foreignKey: "ParentMenuId"});
  Menus.hasMany(Menus, { as: "Menus", foreignKey: "ParentMenuId"});
  RoleMenu.belongsTo(Menus, { as: "Menu", foreignKey: "MenuId"});
  Menus.hasMany(RoleMenu, { as: "RoleMenus", foreignKey: "MenuId"});
  RoleMenu.belongsTo(Roles, { as: "Role", foreignKey: "RoleId"});
  Roles.hasMany(RoleMenu, { as: "RoleMenus", foreignKey: "RoleId"});
  UserRole.belongsTo(Roles, { as: "Role", foreignKey: "RoleId"});
  Roles.hasMany(UserRole, { as: "UserRoles", foreignKey: "RoleId"});
  UserRole.belongsTo(Users, { as: "User", foreignKey: "UserId"});
  Users.hasMany(UserRole, { as: "UserRoles", foreignKey: "UserId"});

  return {
    Menus: Menus,
    RoleMenu: RoleMenu,
    Roles: Roles,
    UserRole: UserRole,
    Users: Users,
  };
}
