import { Sequelize } from "sequelize";
import ReportsFactory, { Report } from "./Report.model";
import { User } from "../User";
import { Project } from "../Project";

export default (sequelize: Sequelize) => {
    ReportsFactory(sequelize);

    User.hasMany(Report, { foreignKey: { name: "user_id", allowNull: false } });
    Report.belongsTo(User, { foreignKey: { name: "user_id", allowNull: false } });

    Project.hasMany(Report, { foreignKey: { name: "project_id", allowNull: false } });
    Report.belongsTo(Project, { foreignKey: { name: "project_id", allowNull: false } });

};

export { Report };
