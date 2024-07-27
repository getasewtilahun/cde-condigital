import {
  InternalServerError,
  BadRequestError,
  NotFoundError,
} from "../../errors/Errors";
import { Organization } from "../../models/Organization";
import { createTransaction } from "../../utilities/database/sequelize";
import async from "async";
import { Transaction } from "sequelize/types";
import { UserLogService } from "../User";
import { OrganizationDAL } from "../../dals/Organization";
class OrganizationService {
  /**
   * Create  Organization
   *
   * @param {Organization} organization
   * @param {Transaction} transaction
   */

  static create(organization: Organization): Promise<any> {
    return new Promise((resolve, reject) => {
      async.waterfall(
        [
          (done: Function) => {
            createTransaction()
              .then((transaction) => done(null, transaction))
              .catch((error) => reject(new InternalServerError(error)));
          },
          (transaction: Transaction, done: Function) => {
            if (organization.id)
              this.update(organization.id, organization, transaction)
                .then(() => done(null, transaction))
                .catch((error) => done(error, transaction));
            else
              OrganizationDAL.create(organization, transaction)
                .then(() => done(null, transaction))
                .catch((error) =>
                  done(new InternalServerError(error), transaction)
                );
          },
          (transaction: Transaction, done: Function) => {
            UserLogService.create(
              {
                table: "organization",
                action: "register",
                description: "Organization Created",
                organization_id: null,
                user_id: organization.user_id,
              },
              transaction
            )
              .then(() => done(null, transaction))
              .catch((error) => done(error, transaction));
          },
        ],
        (error, transaction: any) => {
          if (error) {
            reject(error);
            console.log(error);
            transaction.rollback();
          } else {
            transaction.commit();
            resolve(true);
          }
        }
      );
    });
  }

  /**
   * Find All Organization
   *
   * @param {string} term
   *
   * @returns {Promise<Organization[]>}
   */
  public static findAll(query: any): Promise<Organization[]> {
    return new Promise((resolve, reject) => {
      OrganizationDAL.findMany(query)
        .then((user: any) => {
          resolve(user);
        })
        .catch((error: any) => {
          reject(new InternalServerError(error));
        });
    });
  }

  /**
   * Find Paged Organization
   *
   * @param {string} query
   *
   * @returns {Promise<Organization[]>}
   */
  public static findPaged(query: any) {
    return new Promise((resolve, reject) => {
      OrganizationDAL.findPaged(query)
        .then((result) => {
          resolve(result);
        })
        .catch((error: any) => {
          reject(new InternalServerError(error));
        });
    });
  }

  /**
   * Find Organization By ID
   *
   * @param {string} id
   */
  public static findByID(id: string): Promise<Organization> {
    return new Promise((resolve, reject) => {
      let query: any = { id: id };
      OrganizationDAL.findOne(query)
        .then((result: any) => {
          resolve(result);
        })
        .catch((error: any) => {
          reject(new InternalServerError(error));
        });
    });
  }

  /**
   * update Organization
   * @param {int} id
   * @param {Organization} payload
   */
  static update(id: number, payload: Organization, transaction?: Transaction) {
    return new Promise((resolve, reject) => {
      async.waterfall(
        [
          (done: Function) => {
            OrganizationDAL.findOne({ id: id })
              .then((organization) => {
                if (organization) {
                  done(null, organization);
                } else {
                  done(new NotFoundError("Organization Not Found"));
                }
              })
              .catch((error) => done(new InternalServerError(error)));
          },
          (organization: Organization, done: Function) => {
            OrganizationDAL.update(organization, payload, transaction)
              .then((result) => resolve(result))
              .catch((error) => done(new BadRequestError(error)));
          },
        ],
        (error) => {
          if (error) {
            console.log(error);
            reject(error);
          }
        }
      );
    });
  }

  /**
   * Delete Organization By ID
   *
   * @param {string} id
   */
  public static delete(id: string): Promise<Organization> {
    return new Promise((resolve, reject) => {
      let query: any = { id: id };
      OrganizationDAL.delete(query)
        .then((result: any) => resolve(result))
        .catch((error: any) => {
          reject(new InternalServerError(error));
        });
    });
  }
}

export default OrganizationService;
