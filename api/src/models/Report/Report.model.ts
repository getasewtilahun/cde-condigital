import { Sequelize, Model, DataTypes } from "sequelize";

export class Report extends Model {
  public id!: number;
  public project_id!: number;
  public document_id!: number;
  public document_assignment_id!: string;
  public document_name!: string;
  public date!: string;
  public type!: string;
  public author!: number;
  public description!: string;
  public ref_no!: string;
  public considered_doc_id!: string;
  public assigned_to!: string;
  public user_id!: number;
  public status!: string;
  public message!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public name: any;
  public url: any;
  public size: any;
}

export default (sequelize: Sequelize) => {
  Report.init(
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
      document_assignment_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      considered_doc_id: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      document_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      date: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      ref_no: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      author: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      assigned_to: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "report",
      tableName: "reports",
    }
  );
};
