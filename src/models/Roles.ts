import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { RoleMenu, RoleMenuId } from './RoleMenu';
import type { UserRole, UserRoleId } from './UserRole';

export interface RolesAttributes {
  Id?: number;
  Code: string;
  Name: string;
  Description?: string;
  IsActive: boolean;
  IsDeleted: boolean;
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt?: Date;
}

export type RolesPk = "Id";
export type RolesId = Roles[RolesPk];
export type RolesOptionalAttributes = "Description" | "IsActive" | "CreatedAt" | "UpdatedAt" | "DeletedAt";
export type RolesCreationAttributes = Optional<RolesAttributes, RolesOptionalAttributes>;

export class Roles extends Model<RolesAttributes, RolesCreationAttributes> implements RolesAttributes {
  Id?: number;
  Code!: string;
  Name!: string;
  Description?: string;
  IsActive!: boolean;
  IsDeleted!: boolean;
  CreatedAt!: Date;
  UpdatedAt!: Date;
  DeletedAt?: Date;

  // Roles hasMany RoleMenu via RoleId
  RoleMenus!: RoleMenu[];
  getRoleMenus!: Sequelize.HasManyGetAssociationsMixin<RoleMenu>;
  setRoleMenus!: Sequelize.HasManySetAssociationsMixin<RoleMenu, RoleMenuId>;
  addRoleMenu!: Sequelize.HasManyAddAssociationMixin<RoleMenu, RoleMenuId>;
  addRoleMenus!: Sequelize.HasManyAddAssociationsMixin<RoleMenu, RoleMenuId>;
  createRoleMenu!: Sequelize.HasManyCreateAssociationMixin<RoleMenu>;
  removeRoleMenu!: Sequelize.HasManyRemoveAssociationMixin<RoleMenu, RoleMenuId>;
  removeRoleMenus!: Sequelize.HasManyRemoveAssociationsMixin<RoleMenu, RoleMenuId>;
  hasRoleMenu!: Sequelize.HasManyHasAssociationMixin<RoleMenu, RoleMenuId>;
  hasRoleMenus!: Sequelize.HasManyHasAssociationsMixin<RoleMenu, RoleMenuId>;
  countRoleMenus!: Sequelize.HasManyCountAssociationsMixin;
  // Roles hasMany UserRole via RoleId
  UserRoles!: UserRole[];
  getUserRoles!: Sequelize.HasManyGetAssociationsMixin<UserRole>;
  setUserRoles!: Sequelize.HasManySetAssociationsMixin<UserRole, UserRoleId>;
  addUserRole!: Sequelize.HasManyAddAssociationMixin<UserRole, UserRoleId>;
  addUserRoles!: Sequelize.HasManyAddAssociationsMixin<UserRole, UserRoleId>;
  createUserRole!: Sequelize.HasManyCreateAssociationMixin<UserRole>;
  removeUserRole!: Sequelize.HasManyRemoveAssociationMixin<UserRole, UserRoleId>;
  removeUserRoles!: Sequelize.HasManyRemoveAssociationsMixin<UserRole, UserRoleId>;
  hasUserRole!: Sequelize.HasManyHasAssociationMixin<UserRole, UserRoleId>;
  hasUserRoles!: Sequelize.HasManyHasAssociationsMixin<UserRole, UserRoleId>;
  countUserRoles!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Roles {
    return Roles.init({
      Id: {
        autoIncrement: true,
        autoIncrementIdentity: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        validate: {
          isInt: true,
          min: 1,
        },
      },
      Code: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: "Roles_Code_key"
      },
      Name: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      Description: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      IsActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      IsDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      CreatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      UpdatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    }, {
    sequelize,
    tableName: 'Roles',
    schema: 'public',
    timestamps: true,
    paranoid: true,
    createdAt: 'CreatedAt',
    updatedAt: 'UpdatedAt',
    deletedAt: 'DeletedAt',
    indexes: [
      {
        name: "Roles_Code_key",
        unique: true,
        fields: [
          { name: "Code" },
        ]
      },
      {
        name: "Roles_pkey",
        unique: true,
        fields: [
          { name: "Id" },
        ]
      },
    ]
  });
  }
}
