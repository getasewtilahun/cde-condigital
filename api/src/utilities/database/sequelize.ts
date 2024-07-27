import config from "config";
import { Sequelize, Transaction } from "sequelize";
import logger from "../loggers/winston";
import models from "../../models";
import DocumentFactory, { Document } from "../../models/Document";
import DocumentAssignmentFactory, { DocumentAssignment } from "../../models/DocumentAssignment";
import { Project } from "../../models/Project/Project.model";
import { RequestForInformation } from "../../models/Communication";
import { Report } from "../../models/Report";
import { ScheduleMeeting } from "../../models/Communication/ScheduleMeeting.model";
import { Message } from "../../models/Communication/Message.model";
import CommunicationGroupFactory, { CommunicationGroup } from "../../models/Communication/CommunicationGroup";
import CommunicationMessageFactory, { CommunicationMessage } from "../../models/Communication/CommunicationMessage";
import CommunicationGroupUserFactory, { CommunicationGroupUser } from "../../models/Communication/CommunicationGroupUser";
import { User } from "../../models/User/User.model";
import OrganizationFactory, { Organization } from "../../models/Organization";
export let sequelize: Sequelize;

export default async () => {
  let dbHost: string = config.get("database.host");
  let dbName: string = config.get("database.name");
  let dbUser: string = config.get("database.user");
  let dbPassword: string =
    process.env.DB_PASSWORD || config.get("database.password");

  sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: "mysql",
    dialectOptions: { decimalNumbers: true },
    logging: false,
  });
  models(sequelize);
  DocumentFactory(sequelize)
  DocumentAssignmentFactory(sequelize)
  CommunicationGroupFactory(sequelize)
  CommunicationMessageFactory(sequelize)
  CommunicationGroupUserFactory(sequelize)
  OrganizationFactory(sequelize)

  Document.belongsTo(Project, {
    foreignKey: { name: "project_id", allowNull: true },
  });
  RequestForInformation.belongsTo(Document, {
    foreignKey: { name: "document_id", allowNull: true },
  });
  ScheduleMeeting.belongsTo(Document, {
    foreignKey: { name: "document_id", allowNull: true },
  });
  Message.belongsTo(Document, {
    foreignKey: { name: "document_id", allowNull: true },
  });
  // RequestForInformation.belongsTo(DocumentAssignment, {
  //   foreignKey: { name: "document_assignment_id", allowNull: true },
  // });
  Report.belongsTo(Document, {
    foreignKey: { name: "document_id", allowNull: true },
  });
  // Report.belongsTo(DocumentAssignment, {
  //   foreignKey: { name: "document_assignment_id", allowNull: true },
  // });

  CommunicationGroup.hasMany(CommunicationMessage, {
    foreignKey: 'communication_group_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  CommunicationGroup.hasMany(CommunicationGroupUser, {
    foreignKey: "communication_group_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  CommunicationGroupUser.belongsTo(User, {
    foreignKey: "user_id",
  });
  CommunicationGroupUser.belongsTo(CommunicationGroup, {
    foreignKey: "communication_group_id",
  });

  CommunicationMessage.belongsTo(User, {
    foreignKey: "user_id",
  });

  CommunicationMessage.belongsTo(CommunicationGroup, {
    foreignKey: "communication_group_id",
  });

  Organization.belongsTo(User, {
    foreignKey: "user_id",
  });
  Organization.belongsTo(Project, {
    foreignKey: { name: "project_id", allowNull: true },
  });

  sequelize
    .sync({ force: false, alter: false })
    .then((sequelize) => {
      logger.info("Connection has been established successfully.");
    })
    .catch((error: any) => {
      logger.error(`Database connection error: ${error}`);
    });


};

export const createTransaction = (): Promise<Transaction> => {
  return new Promise(async (resolve, reject) => {
    sequelize
      .transaction()
      .then((transaction) => resolve(transaction))
      .catch((error) => reject(error));
  });
};

export {
  Document, CommunicationMessage, User, CommunicationGroup
}