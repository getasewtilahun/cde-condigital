import { Sequelize } from "sequelize";
import { Document } from "../Document";
import RequestForInformationFactory, { RequestForInformation } from "../Communication/RequestForInformation.model";
import ScheduleMeetingFactory, { ScheduleMeeting } from "../Communication/ScheduleMeeting.model";
import MessageFactory, { Message } from "../Communication/Message.model";

import { User } from "../User";
import { Project } from "../Project";
import RequestForInformationStatusFactory, { RequestForInformationStatus } from "./RequestForInformationStatus.model";

export default (sequelize: Sequelize) => {
    RequestForInformationFactory(sequelize);
    RequestForInformationStatusFactory(sequelize);
    ScheduleMeetingFactory(sequelize);
    MessageFactory(sequelize);

    // RequestForInformation.belongsTo(Document, { foreignKey: { name: "document_id", allowNull: false } });
    // Document.hasMany(RequestForInformation, { foreignKey: { name: "document_id", allowNull: false } });

    User.hasMany(RequestForInformation, { foreignKey: { name: "user_id", allowNull: false } });
    RequestForInformation.belongsTo(User, { foreignKey: { name: "user_id", allowNull: false } });

    User.hasMany(RequestForInformationStatus, { foreignKey: { name: "user_id", allowNull: false } });
    RequestForInformationStatus.belongsTo(User, { foreignKey: { name: "user_id", allowNull: false } });

    Project.hasMany(RequestForInformation, { foreignKey: { name: "project_id", allowNull: false } });
    RequestForInformation.belongsTo(Project, { foreignKey: { name: "project_id", allowNull: false } });

    Project.hasMany(RequestForInformationStatus, { foreignKey: { name: "project_id", allowNull: false } });
    RequestForInformationStatus.belongsTo(Project, { foreignKey: { name: "project_id", allowNull: false } });

    RequestForInformation.hasMany(RequestForInformationStatus, { foreignKey: { name: "request_for_information_id", allowNull: false } });
    RequestForInformationStatus.belongsTo(RequestForInformation, { foreignKey: { name: "request_for_information_id", allowNull: false } });

    User.hasMany(ScheduleMeeting, { foreignKey: { name: "user_id", allowNull: false } });
    ScheduleMeeting.belongsTo(User, { foreignKey: { name: "user_id", allowNull: false } });

    Project.hasMany(ScheduleMeeting, { foreignKey: { name: "project_id", allowNull: false } });
    ScheduleMeeting.belongsTo(Project, { foreignKey: { name: "project_id", allowNull: false } });

    Project.hasMany(Message, { foreignKey: { name: "project_id", allowNull: false } });
    Message.belongsTo(Project, { foreignKey: { name: "project_id", allowNull: false } });

    User.hasMany(Message, { foreignKey: { name: "user_id", allowNull: false } });
    Message.belongsTo(User, { foreignKey: { name: "user_id", allowNull: false } });

    User.hasMany(Message, { foreignKey: { name: "from", allowNull: false } });
    Message.belongsTo(User, { foreignKey: { name: "from", allowNull: false } });

    User.hasMany(Message, { foreignKey: { name: "to", allowNull: false } });
    Message.belongsTo(User, { foreignKey: { name: "to", allowNull: false } });

};

export { Document, RequestForInformation };
