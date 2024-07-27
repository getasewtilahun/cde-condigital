import UserLogFactory, { UserLog } from "./UserLog.model";
import UserFactory, { User } from "./User.model";
import UserSeenFactory, { UserSeen } from "./UserSeen.model";
import UserAccessFactory, { UserAccess } from "./UserAccess.model";
import UserRoleFactory, { UserRole } from "./UserRole.model";
import { Sequelize } from "sequelize";

export default (sequelize: Sequelize) => {
  UserFactory(sequelize);
  UserLogFactory(sequelize);
  UserSeenFactory(sequelize);
  UserAccessFactory(sequelize);
  UserRoleFactory(sequelize);

  User.hasMany(UserLog, { foreignKey: { name: "user_id", allowNull: false } });
  UserLog.belongsTo(User, {
    foreignKey: { name: "user_id", allowNull: false },
  });
  User.belongsTo(UserRole, {
    foreignKey: { name: "role_id", allowNull: true },
  });
  UserRole.hasMany(UserAccess, { foreignKey: "user_role_id" });
};

export { UserLog, User, UserSeen, UserAccess, UserRole };
