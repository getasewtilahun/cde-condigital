import { Sequelize, Model, DataTypes } from "sequelize";

export class UserSeen extends Model {
  public id!: number;
  public type!: string;
  public time!: number;
  public parent_id!: number;
  public user_id!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default (sequelize: Sequelize) => {
  UserSeen.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      time: {
        type: DataTypes.DATE,
        defaultValue: Date.now,
      },
      parent_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "user_seen",
      tableName: "user_seens",
    }
  );
};
