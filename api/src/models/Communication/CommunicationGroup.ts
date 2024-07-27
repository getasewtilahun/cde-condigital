import { Sequelize, Model, DataTypes } from "sequelize";
import { CommunicationGroupUser } from "./CommunicationGroupUser";

export class CommunicationGroup extends Model {
  public id!: number;
  public user_id!: number;
  public uid!: string;

  public name!: string;
  public unseen_messages!: number;

  public last_seen!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public communication_group_users!: CommunicationGroupUser[];
}

export default (sequelize: Sequelize) => {
  CommunicationGroup.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      uid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
      },

      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "communication_group",
      tableName: "communication_groups",
    }
  );
};
