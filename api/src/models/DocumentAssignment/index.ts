import { Sequelize } from "sequelize";
import DocumentFactory, { Document } from "../Document";
import DocumentStatusFactory, { DocumentStatus } from "./DocumentStatus.model";
import DocumentAssignmentFactory, { DocumentAssignment } from "./DocumentAssignment.model";
import { User } from "../User";
import { Project } from "../Project";

export default (sequelize: Sequelize) => {
    DocumentFactory(sequelize);
    DocumentStatusFactory(sequelize);
    DocumentAssignmentFactory(sequelize);

    DocumentAssignment.hasMany(DocumentStatus, { foreignKey: { name: "document_assignment_id", allowNull: false } });
    DocumentStatus.belongsTo(DocumentAssignment, { foreignKey: { name: "document_assignment_id", allowNull: false } });

    DocumentAssignment.belongsTo(Document, { foreignKey: { name: "document_id", allowNull: false } });
    Document.hasMany(DocumentAssignment, { foreignKey: { name: "document_id", allowNull: false } });

    User.hasMany(DocumentAssignment, { foreignKey: { name: "user_id", allowNull: false } });
    DocumentAssignment.belongsTo(User, { foreignKey: { name: "user_id", allowNull: false } });

    Project.hasMany(DocumentAssignment, { foreignKey: { name: "project_id", allowNull: false } });
    DocumentAssignment.belongsTo(Project, { foreignKey: { name: "project_id", allowNull: false } });
};

export { Document, DocumentStatus, DocumentAssignment };
