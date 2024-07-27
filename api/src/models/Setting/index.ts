import { Sequelize } from "sequelize";
import DocumentNameSettingFactory, { DocumentNameSetting } from "./DocumentNameSetting.model";


export default (sequelize: Sequelize) => {
    DocumentNameSettingFactory(sequelize);

};

export { DocumentNameSetting };
