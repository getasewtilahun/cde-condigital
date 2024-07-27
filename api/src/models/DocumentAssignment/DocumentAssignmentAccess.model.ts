import { Sequelize, Model, DataTypes } from "sequelize";

export class DocumentAssignmentAccess extends Model {
  public id!: number;
  public document_assignment_id!: number;
  public user_id!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default (sequelize: Sequelize) => {
  DocumentAssignmentAccess.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      document_assignment_id: {
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
      modelName: "document_assignment_access",
      tableName: "document_assignment_access",
    }
  );
};
