import { Sequelize } from "sequelize";
import ProjectFactory, { Project } from "./Project.model";
import { Document } from "../Document";


export default (sequelize: Sequelize) => {
  ProjectFactory(sequelize);

};

export { Project };
