import { Sequelize, Model, DataTypes } from "sequelize";
import { UserStatus } from "../../constants/constants";
import { InternalServerError } from "../../errors/Errors";
import { generateRandomStr, hashPassword } from "../../utilities/helper/helper";
import { UserRole } from "./UserRole.model";

export class User extends Model {
  public id!: number;
  public full_name!: string;
  public email!: string;
  public phone_number!: string;
  public password!: string;
  public organization!: string;
  public role_id!: number;
  public is_super_user!: boolean;
  public status!: string;
  public chat_id!: string;
  public user_role!: UserRole;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      full_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      organization: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      is_super_user: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: UserStatus.ACTIVATED,
      },
      chat_id: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "user",
      tableName: "users",
    }
  );

  User.beforeCreate((user, options) => {
    if (user.password) {
      return hashPassword(user.password)
        .then((hashed: any) => {
          user.password = hashed;
          user.chat_id = `_${generateRandomStr(4)}`;
        })
        .catch((error: any) => {
          throw new InternalServerError(error);
        });
    }
  });
};
