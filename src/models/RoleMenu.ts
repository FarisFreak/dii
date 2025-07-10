import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Menus, MenusId } from './Menus';
import type { Roles, RolesId } from './Roles';

export interface RoleMenuAttributes {
  Id?: number;
  RoleId: number;
  MenuId: number;
  GrantCreate: boolean;
  GrantUpdate: boolean;
  GrantDelete: boolean;
  IsActive: boolean;
  IsDeleted: boolean;
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt?: Date;
}

export type RoleMenuPk = "Id";
export type RoleMenuId = RoleMenu[RoleMenuPk];
export type RoleMenuOptionalAttributes = "GrantCreate" | "GrantUpdate" | "GrantDelete" | "IsActive" | "CreatedAt" | "UpdatedAt" | "DeletedAt";
export type RoleMenuCreationAttributes = Optional<RoleMenuAttributes, RoleMenuOptionalAttributes>;

export class RoleMenu extends Model<RoleMenuAttributes, RoleMenuCreationAttributes> implements RoleMenuAttributes {
  Id?: number;
  RoleId!: number;
  MenuId!: number;
  GrantCreate!: boolean;
  GrantUpdate!: boolean;
  GrantDelete!: boolean;
  IsActive!: boolean;
  IsDeleted!: boolean;
  CreatedAt!: Date;
  UpdatedAt!: Date;
  DeletedAt?: Date;

  // RoleMenu belongsTo Menus via MenuId
  Menu!: Menus;
  getMenu!: Sequelize.BelongsToGetAssociationMixin<Menus>;
  setMenu!: Sequelize.BelongsToSetAssociationMixin<Menus, MenusId>;
  createMenu!: Sequelize.BelongsToCreateAssociationMixin<Menus>;
  // RoleMenu belongsTo Roles via RoleId
  Role!: Roles;
  getRole!: Sequelize.BelongsToGetAssociationMixin<Roles>;
  setRole!: Sequelize.BelongsToSetAssociationMixin<Roles, RolesId>;
  createRole!: Sequelize.BelongsToCreateAssociationMixin<Roles>;

  static initModel(sequelize: Sequelize.Sequelize): typeof RoleMenu {
    return RoleMenu.init({
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
      RoleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Roles',
          key: 'Id'
        }
      },
      MenuId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Menus',
          key: 'Id'
        }
      },
      GrantCreate: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      GrantUpdate: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      GrantDelete: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
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
    tableName: 'RoleMenu',
    schema: 'public',
    timestamps: true,
    paranoid: true,
    createdAt: 'CreatedAt',
    updatedAt: 'UpdatedAt',
    deletedAt: 'DeletedAt',
    indexes: [
      {
        name: "RoleMenu_pkey",
        unique: true,
        fields: [
          { name: "Id" },
        ]
      },
    ]
  });
  }
}
