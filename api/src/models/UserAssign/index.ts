import { Sequelize } from "sequelize";
import UserAssignFactory, { UserAssign } from "./UserAssign.model";
import { User } from "../User/User.model";
import { Project } from "../Project/Project.model";

export default (sequelize: Sequelize) => {
    UserAssignFactory(sequelize);

    User.hasMany(UserAssign, { foreignKey: { name: "assigned_id", allowNull: false } });
    UserAssign.belongsTo(User, { foreignKey: { name: "assigned_id", allowNull: false } });

    Project.hasMany(UserAssign, { foreignKey: { name: "project_id", allowNull: false } });
    UserAssign.belongsTo(Project, { foreignKey: { name: "project_id", allowNull: false } });
};
