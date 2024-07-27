import { Sequelize, Model, DataTypes } from "sequelize";
import { User } from "../User";

export class CommunicationGroupUser extends Model {
  public id!: number;
  public communication_group_id!: number;
  public user_id!: number;

  public last_seen!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public user!: User;
}

export default (sequelize: Sequelize) => {
  CommunicationGroupUser.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      communication_group_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      last_seen: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "communication_group_user",
      tableName: "communication_group_users",
      indexes: [
        {
          unique: true,
          fields: ["communication_group_id", "user_id"],
        },
      ],
    }
  );
};
