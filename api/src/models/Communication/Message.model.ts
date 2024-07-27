import { Sequelize, Model, DataTypes } from "sequelize";

export class Message extends Model {
    public id!: number;
    public project_id!: number;
    public document_id!: number;
    public from!: number;
    public to!: number;
    public message!: string;
    public seen!: boolean;
    public user_id!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public size: any;
    public name: any;
    public url: any;
}

export default (sequelize: Sequelize) => {
    Message.init(
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
            message: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            from: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            to: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            seen: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "message",
            tableName: "messages",
        }
    );
};
