import { Sequelize, Model, DataTypes } from "sequelize";

export class UserAccess extends Model {
  public id!: number;
  public feature!: number;
  public read!: boolean;
  public write!: boolean;
  public delete!: boolean;
  public edit!: boolean;
  public approve!: boolean;
  public check!: boolean;
  public entry_special!: number[];
  public approve_special!: number[];

  public user_role_id!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default (sequelize: Sequelize) => {
  UserAccess.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      feature: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      write: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      delete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      edit: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      approve: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      check: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      entry_special: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          return this.getDataValue("entry_special")
            ? JSON.parse(this.getDataValue("entry_special"))
            : [];
        },
        set(values: any) {
          if (values) {
            this.setDataValue("entry_special", JSON.stringify(values));
          }
        },
      },
      approve_special: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          return this.getDataValue("approve_special")
            ? JSON.parse(this.getDataValue("approve_special"))
            : [];
        },
        set(values: any[]) {
          this.setDataValue("approve_special", JSON.stringify(values ?? []));
        },
      },

      user_role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "user_access",
      tableName: "user_accesses",
    }
  );
};
