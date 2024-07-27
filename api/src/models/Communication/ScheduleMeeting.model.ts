import { Sequelize, Model, DataTypes } from "sequelize";

export class ScheduleMeeting extends Model {
  public id!: number;
  public project_id!: number;
  public document_id!: number;
  public subject!: string;
  public ajenda!: string;
  public date!: string;
  public time!: string;
  public place!: string;
  public scheduled_by!: number;
  public participants!: string;
  public remark!: string;
  public user_id!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public size: any;
  public name: any;
  public url: any;
}

export default (sequelize: Sequelize) => {
  ScheduleMeeting.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      project_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      document_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      subject: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ajenda: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      date: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      time: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      place: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      scheduled_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      participants: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      remark: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "schedule_meeting",
      tableName: "schedule_meetings",
    }
  );
};
