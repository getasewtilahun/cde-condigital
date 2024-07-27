import { Transaction } from "sequelize/types";
import { Project } from "../../models/Project";
import {
  getPagingData,
  PagedData,
} from "../../utilities/Pagination/Pagination";

class ProjectDAL {
  /**
   * Create  Project
   *
   * @param {Project}  project
   * @param {Transaction} transaction
   */
  static create(project: any, transaction?: Transaction): Promise<Project> {
    return new Promise((resolve, reject) => {
      Project.create(project, {
        transaction: transaction,
      })
        .then((result) => resolve(result))
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * Find Many  Project
   *
   * @param {any} query
   */
  static findMany(query: any): Promise<Project[]> {
    return new Promise((resolve, reject) => {
      Project.findAll({
        where: query,
      })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    });
  }

  /**
   * Find Paged  Project
   *
   * @param {any} query
   */
  static findPaged(query: any) {
    const { where, limit, offset } = query;
    return new Promise<PagedData<Project[]>>((resolve, reject) => {
      Project.findAndCountAll({
        where,
        limit: limit,
        offset: offset,
      })
        .then((result) => resolve(getPagingData(result, offset, limit)))
        .catch((error) => reject(error));
    });
  }

  /**
   * Find One  Project
   *
   * @param {any} query
   */
  static findOne(query: any) {
    return new Promise((resolve, reject) => {
      Project.findOne({
        where: query,
        include: [],
      })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    });
  }

  /**
   * Find One  Project
   *
   * @param {any} query
   */
  static findId(query: any) {
    return new Promise((resolve, reject) => {
      Project.findOne({
        where: query,
      })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    });
  }

  /**
   * Update  Project
   * @param { Project} project
   * @param {Object} payload
   */
  static update(
    project: Project,
    payload: Partial<Project>,
    transaction?: Transaction
  ) {
    return new Promise((resolve, reject) => {
      if (project) {
        if (payload.name !== undefined) project.name = payload.name;
        if (payload.code !== undefined)
          project.code = payload.code;
        if (payload.project_type !== undefined)
          project.project_type = payload.project_type;
        if (payload.contract_type !== undefined)
          project.contract_type = payload.contract_type;
        if (payload.delivery_method !== undefined)
          project.delivery_method = payload.delivery_method;
        if (payload.address !== undefined)
          project.address = payload.address;
        if (payload.site_area !== undefined)
          project.site_area = payload.site_area;
        if (payload.type_of_asset !== undefined)
          project.type_of_asset = payload.type_of_asset;
        if (payload.project_budget !== undefined)
          project.project_budget = payload.project_budget;
        if (payload.estimated_duration !== undefined)
          project.estimated_duration = payload.estimated_duration;
        if (payload.basement_size !== undefined)
          project.basement_size = payload.basement_size;
        if (payload.floor_size !== undefined)
          project.floor_size = payload.floor_size;
        if (payload.road_size !== undefined)
          project.road_size = payload.road_size;
        if (payload.start_date !== undefined)
          project.start_date = payload.start_date;
        if (payload.end_date !== undefined)
          project.end_date = payload.end_date;

        project
          .save({ transaction })
          .then((doc) => resolve(doc))
          .catch((error) => reject(error));
      } else {
        resolve(null);
      }
    });
  }

  /**
   * Delete  Project
   *
   * @param {Object} query
   */
  static delete(query: any) {
    return new Promise((resolve, reject) => {
      Project.destroy({ where: query })
        .then((result) => resolve(true))
        .catch((error) => reject(error));
    });
  }
}

export default ProjectDAL;
