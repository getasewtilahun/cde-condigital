import { Sequelize, Model, DataTypes } from 'sequelize';

export class UserAssign extends Model {
  public id!: number;
  public project_id!: number;
  public assigned_id!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default (sequelize: Sequelize) => {
  UserAssign.init(
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
      assigned_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'UserAssign',
      tableName: 'user_assigns',
      indexes: [
        {
          unique: true,
          fields: ['project_id', 'assigned_id'],
        },
      ],
    }
  );
};
