import { Sequelize, Model, DataTypes } from "sequelize";
import { UserAccess } from "./UserAccess.model";

export class UserRole extends Model {
  public id!: number;
  public name!: string;
  public user_accesses!: UserAccess[];
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default (sequelize: Sequelize) => {
  UserRole.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "user_role",
      tableName: "user_roles",
    }
  );
};
