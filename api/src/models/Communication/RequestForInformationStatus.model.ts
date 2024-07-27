import { Sequelize, Model, DataTypes } from "sequelize";

export class RequestForInformationStatus extends Model {
    url(url: any) {
        throw new Error("Method not implemented.");
    }
    public id!: number;
    public request_for_information_id!: number;
    public project_id!: number;
    public document_id!: number;
    public from!: number;
    public status!: string;
    public message!: string;
    public date!: string;
    public user_id!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default (sequelize: Sequelize) => {
    RequestForInformationStatus.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            request_for_information_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            document_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            project_id: {
                type: DataTypes.INTEGER,
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
            modelName: "request_for_information_status",
            tableName: "request_for_information_statuses",
        }
    );

};
