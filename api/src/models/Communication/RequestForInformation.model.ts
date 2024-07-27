import { Sequelize, Model, DataTypes } from "sequelize";

export class RequestForInformation extends Model {
  url(url: any) {
    throw new Error("Method not implemented.");
  }
  public id!: number;
  public project_id!: number;
  public document_id!: number;
  public document_assignment_id!: string;
  public subject!: string;
  public description!: string;
  public reference_no!: string;
  public document_name!: string;
  public considered_doc_id!: string;
  public cc!: string;
  public date!: string;
  public from!: number;
  public assigned_to!: number;
  public status!: string;
  public message!: string;
  public user_id!: number;
  public documentID: any;
  public name: any;
  public size: any;
  public file: any;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default (sequelize: Sequelize) => {
  RequestForInformation.init(
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
      subject: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      reference_no: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      date: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      from: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      assigned_to: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      cc: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      message: {
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
      modelName: "request_for_information",
      tableName: "request_for_informations",
    }
  );

};
