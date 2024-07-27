import { Sequelize } from "sequelize";
import User from "./User";
import Project from "./Project";
import Communication from "./Communication";
import DocumentNameSetting from "./Setting";
import UserAssign from "./UserAssign";
import Report from "./Report";
export default (sequelize: Sequelize) => {
  User(sequelize);
  Project(sequelize);
  UserAssign(sequelize);
  Report(sequelize);
  DocumentNameSetting(sequelize);
  Communication(sequelize);

};
