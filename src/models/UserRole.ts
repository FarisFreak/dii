import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Roles, RolesId } from './Roles';
import type { Users, UsersId } from './Users';

export interface UserRoleAttributes {
  Id?: number;
  UserId: number;
  RoleId: number;
}

export type UserRolePk = "Id";
export type UserRoleId = UserRole[UserRolePk];
export type UserRoleCreationAttributes = UserRoleAttributes;

export class UserRole extends Model<UserRoleAttributes, UserRoleCreationAttributes> implements UserRoleAttributes {
  Id?: number;
  UserId!: number;
  RoleId!: number;

  // UserRole belongsTo Roles via RoleId
  Role!: Roles;
  getRole!: Sequelize.BelongsToGetAssociationMixin<Roles>;
  setRole!: Sequelize.BelongsToSetAssociationMixin<Roles, RolesId>;
  createRole!: Sequelize.BelongsToCreateAssociationMixin<Roles>;
  // UserRole belongsTo Users via UserId
  User!: Users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<Users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<Users, UsersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<Users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof UserRole {
    return UserRole.init({
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
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'Id'
      }
    },
    RoleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Roles',
        key: 'Id'
      }
    }
  }, {
    sequelize,
    tableName: 'UserRole',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "UserRole_pkey",
        unique: true,
        fields: [
          { name: "Id" },
        ]
      },
    ]
  });
  }
}
