import { DataTypes, Model, Sequelize } from "sequelize";
import { User } from "./User";
import { Project } from "./Project";

export class Document extends Model {
  public id!: number;
  public reference_number!: string;
  public name!: string;
  public project_id!: number | null;
  public user_id!: number;
  public date!: Date;
  public url!: string;
  public type!: string;
  public size!: number;
  public remark!: string;
  public is_private!: boolean;

  public user!: User;
  public project!: Project;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default (sequelize: Sequelize) => {
  Document.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      project_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      reference_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: true,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      size: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
      },
      is_private: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "document",
      tableName: "documents",
    }
  );
};
