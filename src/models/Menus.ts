import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { RoleMenu, RoleMenuId } from './RoleMenu';

export interface MenusAttributes {
  Id?: number;
  Code: string;
  Title: string;
  Path?: string;
  ParentMenuId?: number;
  IsActive: boolean;
  IsDeleted: boolean;
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt?: Date;
}

export type MenusPk = "Id";
export type MenusId = Menus[MenusPk];
export type MenusOptionalAttributes = "Path" | "ParentMenuId" | "IsActive" | "CreatedAt" | "UpdatedAt" | "DeletedAt";
export type MenusCreationAttributes = Optional<MenusAttributes, MenusOptionalAttributes>;

export class Menus extends Model<MenusAttributes, MenusCreationAttributes> implements MenusAttributes {
  Id?: number;
  Code!: string;
  Title!: string;
  Path?: string;
  ParentMenuId?: number;
  IsActive!: boolean;
  IsDeleted!: boolean;
  CreatedAt!: Date;
  UpdatedAt!: Date;
  DeletedAt?: Date;

  // Menus belongsTo Menus via ParentMenuId
  ParentMenu!: Menus;
  getParentMenu!: Sequelize.BelongsToGetAssociationMixin<Menus>;
  setParentMenu!: Sequelize.BelongsToSetAssociationMixin<Menus, MenusId>;
  createParentMenu!: Sequelize.BelongsToCreateAssociationMixin<Menus>;
  // Menus hasMany RoleMenu via MenuId
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

  static initModel(sequelize: Sequelize.Sequelize): typeof Menus {
    return Menus.init({
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
        unique: "Menus_Code_key"
      },
      Title: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      Path: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      ParentMenuId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Menus',
          key: 'Id'
        }
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
    tableName: 'Menus',
    schema: 'public',
    timestamps: true,
    paranoid: true,
    createdAt: 'CreatedAt',
    updatedAt: 'UpdatedAt',
    deletedAt: 'DeletedAt',
    indexes: [
      {
        name: "Menus_Code_key",
        unique: true,
        fields: [
          { name: "Code" },
        ]
      },
      {
        name: "Menus_pkey",
        unique: true,
        fields: [
          { name: "Id" },
        ]
      },
    ]
  });
  }
}
