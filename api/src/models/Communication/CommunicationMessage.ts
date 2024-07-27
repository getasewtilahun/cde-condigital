import { Sequelize, Model, DataTypes } from "sequelize";

export class CommunicationMessage extends Model {
  public id!: number;
  public communication_group_id!: number;
  public user_id!: number;

  public text!: string;
  public document_url!: string;
  public date!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default (sequelize: Sequelize) => {
  CommunicationMessage.init(
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

      text: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      document_url: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "communication_message",
      tableName: "communication_messages",
    }
  );
};
