import { Sequelize, Model, DataTypes } from "sequelize";

export class Organization extends Model {
    public id!: number;
    public name!: string;
    public code!: string;
    public project_id!: number;
    public specialization!: string;
    public location!: string;
    public website!: string;
    public email!: string;
    public phone!: string;
    public category!: string;
    public key_contact_person	!: string;
    public user_id!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default (sequelize: Sequelize) => {
    Organization.init(
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
            specialization: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            location: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            website: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            category: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            key_contact_person: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            project_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },

        },
        {
            sequelize,
            modelName: "organization",
            tableName: "organizations",
        }
    );
};
