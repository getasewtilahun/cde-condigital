import {
  InternalServerError,
  BadRequestError,
  NotFoundError,
} from "../../errors/Errors";
import { Project } from "../../models/Project";
import { createTransaction } from "../../utilities/database/sequelize";
import async from "async";
import { Transaction } from "sequelize/types";
import { UserLogService } from "../User";
import { ProjectDAL } from "../../dals/Project";
class ProjectService {
  /**
   * Create  Project
   *
   * @param {Project} project
   * @param {Transaction} transaction
   */

  static create(project: Project): Promise<any> {
    return new Promise((resolve, reject) => {
      async.waterfall(
        [
          (done: Function) => {
            createTransaction()
              .then((transaction) => done(null, transaction))
              .catch((error) => reject(new InternalServerError(error)));
          },
          (transaction: Transaction, done: Function) => {
            if (project.id)
              this.update(project.id, project, transaction)
                .then(() => done(null, transaction))
                .catch((error) => done(error, transaction));
            else
              ProjectDAL.create(project, transaction)
                .then(() => done(null, transaction))
                .catch((error) =>
                  done(new InternalServerError(error), transaction)
                );
          },
          (transaction: Transaction, done: Function) => {
            UserLogService.create(
              {
                table: "project",
                action: "register",
                description: "Project Created",
                project_id: null,
                user_id: project.user_id,
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
   * Find All Project
   *
   * @param {string} term
   *
   * @returns {Promise<Project[]>}
   */
  public static findAll(query: any): Promise<Project[]> {
    return new Promise((resolve, reject) => {
      ProjectDAL.findMany(query)
        .then((user: any) => {
          resolve(user);
        })
        .catch((error: any) => {
          reject(new InternalServerError(error));
        });
    });
  }

  /**
   * Find Paged Project
   *
   * @param {string} query
   *
   * @returns {Promise<Project[]>}
   */
  public static findPaged(query: any) {
    return new Promise((resolve, reject) => {
      ProjectDAL.findPaged(query)
        .then((result) => {
          resolve(result);
        })
        .catch((error: any) => {
          reject(new InternalServerError(error));
        });
    });
  }

  /**
   * Find Project By ID
   *
   * @param {string} id
   */
  public static findByID(id: string): Promise<Project> {
    return new Promise((resolve, reject) => {
      let query: any = { id: id };
      ProjectDAL.findOne(query)
        .then((result: any) => {
          resolve(result);
        })
        .catch((error: any) => {
          reject(new InternalServerError(error));
        });
    });
  }

  /**
   * update Project
   * @param {int} id
   * @param {Project} payload
   */
  static update(id: number, payload: Project, transaction?: Transaction) {
    return new Promise((resolve, reject) => {
      async.waterfall(
        [
          (done: Function) => {
            ProjectDAL.findOne({ id: id })
              .then((project) => {
                if (project) {
                  done(null, project);
                } else {
                  done(new NotFoundError("Project Not Found"));
                }
              })
              .catch((error) => done(new InternalServerError(error)));
          },
          (project: Project, done: Function) => {
            ProjectDAL.update(project, payload, transaction)
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
   * Delete Project By ID
   *
   * @param {string} id
   */
  public static delete(id: string): Promise<Project> {
    return new Promise((resolve, reject) => {
      let query: any = { id: id };
      ProjectDAL.delete(query)
        .then((result: any) => resolve(result))
        .catch((error: any) => {
          reject(new InternalServerError(error));
        });
    });
  }
}

export default ProjectService;
