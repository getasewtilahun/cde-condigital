import { Sequelize } from "sequelize";
import OrganizationFactory, { Organization } from "./Organization.model";


export default (sequelize: Sequelize) => {
    OrganizationFactory(sequelize);

};

export { Organization };
