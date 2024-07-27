import { Sequelize, Model, DataTypes } from "sequelize";

export class Project extends Model {
  public id!: number;
  public name!: string;
  public code!: string;
  public project_type!: string;
  public contract_type!: string;
  public delivery_method!: string;
  public address!: string;
  public site_area!: string;
  public type_of_asset!: string;
  public project_budget!: number;
  public estimated_duration!: number;
  public basement_size!: number;
  public floor_size!: number;
  public road_size!: number;
  public start_date!: Date;
  public end_date!: Date;
  public user_id!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default (sequelize: Sequelize) => {
  Project.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      project_type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      contract_type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      delivery_method: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      site_area: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      type_of_asset: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      project_budget: {
        type: DataTypes.DECIMAL(12, 2),
        defaultValue: 0,
      },
      estimated_duration: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      basement_size: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      floor_size: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      road_size: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "project",
      tableName: "projects",
    }
  );
};
