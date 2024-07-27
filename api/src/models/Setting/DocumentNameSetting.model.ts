import { Sequelize, Model, DataTypes } from "sequelize";

export class DocumentNameSetting extends Model {
    public id!: number;
    public project_code!: number;
    public Originator!: string;
    public functional_breakdown!: number;
    public spatial!: number;
    public form!: number;
    public discipline!: number;
    public number!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default (sequelize: Sequelize) => {
    DocumentNameSetting.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            project_code: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            Originator: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            functional_breakdown: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            spatial: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            form: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            discipline: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            number: {
                type: DataTypes.INTEGER,
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
            modelName: "document_name_setting",
            tableName: "document_name_settings", // Adjust the table name if needed
        }
    );
};
