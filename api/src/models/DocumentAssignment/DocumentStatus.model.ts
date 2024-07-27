import { Sequelize, Model, DataTypes } from "sequelize";
import { documentAssignmentStatus } from "../../constants/constants";

export class DocumentStatus extends Model {
  public id!: number;
  public document_assignment_id!: number;
  public revision!: string;
  public reviewed_by!: number;
  public authorized_by!: number;
  public approved_by!: number;
  public accepted_by!: number;
  public type_on_status!: string;
  public sub_folder!: string;
  public current_status!: string;
  public requested_status!: string;
  public action_status!: string;
  public comment!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default (sequelize: Sequelize) => {
  DocumentStatus.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      document_assignment_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      current_status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      requested_status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      revision: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      reviewed_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      authorized_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      approved_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      accepted_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      type_on_status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      sub_folder: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      action_status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "DocumentStatus",
      tableName: "document_statuses", // Adjust the table name if needed
    }
  );
};
