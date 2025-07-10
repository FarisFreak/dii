import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { UserRole, UserRoleId } from './UserRole';

export interface UsersAttributes {
  Id?: number;
  Username: string;
  Password: string;
  Email: string;
  Fullname: string;
  IsActive: boolean;
  IsDeleted: boolean;
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt?: Date;
}

export type UsersPk = "Id";
export type UsersId = Users[UsersPk];
export type UsersOptionalAttributes = "IsActive" | "CreatedAt" | "UpdatedAt" | "DeletedAt";
export type UsersCreationAttributes = Optional<UsersAttributes, UsersOptionalAttributes>;

export class Users extends Model<UsersAttributes, UsersCreationAttributes> implements UsersAttributes {
  Id?: number;
  Username!: string;
  Password!: string;
  Email!: string;
  Fullname!: string;
  IsActive!: boolean;
  IsDeleted!: boolean;
  CreatedAt!: Date;
  UpdatedAt!: Date;
  DeletedAt?: Date;

  // Users hasMany UserRole via UserId
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

  static initModel(sequelize: Sequelize.Sequelize): typeof Users {
    return Users.init({
      Id: {
        autoIncrement: true,
        autoIncrementIdentity: true,
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: true,
        validate: {
          isInt: true, // Pastikan Id adalah integer
          min: 1, // Pastikan Id lebih besar dari 0
        },
      },
      Username: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: "Users_Username_key"
      },
      Password: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      Email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: "Users_Email_key"
      },
      Fullname: {
        type: DataTypes.STRING(100),
        allowNull: false
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
    tableName: 'Users',
    schema: 'public',
    timestamps: true,
    paranoid: true,
    createdAt: 'CreatedAt',
    updatedAt: 'UpdatedAt',
    deletedAt: 'DeletedAt',
    indexes: [
      {
        name: "Users_Email_key",
        unique: true,
        fields: [
          { name: "Email" },
        ]
      },
      {
        name: "Users_Username_key",
        unique: true,
        fields: [
          { name: "Username" },
        ]
      },
      {
        name: "Users_pkey",
        unique: true,
        fields: [
          { name: "Id" },
        ]
      },
    ]
  });
  }
}
