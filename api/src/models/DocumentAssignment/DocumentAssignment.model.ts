import { Sequelize, Model, DataTypes } from "sequelize";

export class DocumentAssignment extends Model {
  public id!: number;
  public project_id!: number;
  public date!: string;
  public action_by!: number;
  public type!: string;
  public sub_folder!: string;
  public author!: number;
  public description!: string;
  public status!: string;
  public statu_s!: string;
  public revision!: string;
  public version!: string;
  public originato_r!: string;
  public remark!: string;
  public classification!: string;
  public document_name!: string;
  public format!: string;
  public document_id!: number;
  public user_id!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public size: any;
  public name: any;
  public url: any;
}

export default (sequelize: Sequelize) => {
  DocumentAssignment.init(
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
      date: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      action_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sub_folder: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      author: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      statu_s: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      revision: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      version: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      originato_r: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      remark: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      classification: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      format: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      document_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      document_id: {
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
      modelName: "document_assignment",
      tableName: "document_assignment_updates",
    }
  );
};
