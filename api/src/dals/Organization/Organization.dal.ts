import { Transaction } from "sequelize/types";
import { Organization } from "../../models/Organization";
import {
  getPagingData,
  PagedData,
} from "../../utilities/Pagination/Pagination";

class OrganizationDAL {
  /**
   * Create  Organization
   *
   * @param {Organization}  organization
   * @param {Transaction} transaction
   */
  static create(organization: any, transaction?: Transaction): Promise<Organization> {
    return new Promise((resolve, reject) => {
      Organization.create(organization, {
        transaction: transaction,
      })
        .then((result) => resolve(result))
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * Find Many  Organization
   *
   * @param {any} query
   */
  static findMany(query: any): Promise<Organization[]> {
    return new Promise((resolve, reject) => {
      Organization.findAll({
        where: query,
      })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    });
  }

  /**
   * Find Paged  Organization
   *
   * @param {any} query
   */
  static findPaged(query: any) {
    const { where, limit, offset } = query;
    return new Promise<PagedData<Organization[]>>((resolve, reject) => {
      Organization.findAndCountAll({
        where,
        limit: limit,
        offset: offset,
      })
        .then((result) => resolve(getPagingData(result, offset, limit)))
        .catch((error) => reject(error));
    });
  }

  /**
   * Find One  Organization
   *
   * @param {any} query
   */
  static findOne(query: any) {
    return new Promise((resolve, reject) => {
      Organization.findOne({
        where: query,
        include: [],
      })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    });
  }

  /**
   * Find One  Organization
   *
   * @param {any} query
   */
  static findId(query: any) {
    return new Promise((resolve, reject) => {
      Organization.findOne({
        where: query,
      })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    });
  }

  /**
   * Update  Organization
   * @param { Organization} organization
   * @param {Object} payload
   */
  static update(
    organization: Organization,
    payload: Partial<Organization>,
    transaction?: Transaction
  ) {
    return new Promise((resolve, reject) => {
      if (organization) {
        if (payload.name !== undefined) organization.name = payload.name;
        if (payload.code !== undefined)
          organization.code = payload.code;
        if (payload.project_id !== undefined)
          organization.project_id = payload.project_id;
        if (payload.user_id !== undefined)
          organization.user_id = payload.user_id;
        if (payload.specialization !== undefined)
          organization.specialization = payload.specialization;
        if (payload.location !== undefined)
          organization.location = payload.location;
        if (payload.website !== undefined)
          organization.website = payload.website;
        if (payload.email !== undefined)
          organization.email = payload.email;
        if (payload.phone !== undefined)
          organization.phone = payload.phone;
        if (payload.category !== undefined)
          organization.category = payload.category;
        if (payload.key_contact_person !== undefined)
          organization.key_contact_person = payload.key_contact_person;
        organization
          .save({ transaction })
          .then((doc) => resolve(doc))
          .catch((error) => reject(error));
      } else {
        resolve(null);
      }
    });
  }

  /**
   * Delete  Organization
   *
   * @param {Object} query
   */
  static delete(query: any) {
    return new Promise((resolve, reject) => {
      Organization.destroy({ where: query })
        .then((result) => resolve(true))
        .catch((error) => reject(error));
    });
  }
}

export default OrganizationDAL;
