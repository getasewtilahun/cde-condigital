import {
    InternalServerError,
    BadRequestError,
    NotFoundError,
} from "../../errors/Errors";
import { createTransaction, } from "../../utilities/database/sequelize";
import async from "async";
import { Transaction } from "sequelize/types";
import DocumentNameSettingDAL from "../../dals/Setting/DocumentNameSetting.dal";
import DocumentDAL from "../../dals/Document.dal";
import { DocumentNameSetting } from "../../models/Setting/DocumentNameSetting.model";

class DocumentNameSettingService {
    /**
     * Create  DocumentNameSetting
     *
     * @param {DocumentNameSetting} document_name_setting
     * @param {Transaction} transaction
     */

    static create(document_name_setting: any, transaction?: Transaction): Promise<any> {
        return new Promise((resolve, reject) => {
            async.waterfall(
                [
                    (done: Function) => {
                        createTransaction()
                            .then((transaction) => done(null, transaction))
                            .catch((error) => reject(new InternalServerError(error)));
                    },

                    (transaction: Transaction, done: Function) => {
                        console.log('Document status');
                        if (document_name_setting.id) {
                            this.update(document_name_setting.id, document_name_setting, transaction)
                                .then((result) => done(null, transaction))
                                .catch((error) =>
                                    done(new InternalServerError(error), transaction)
                                );
                        } else {
                            DocumentNameSettingDAL.create({ ...document_name_setting }, transaction)
                                .then((result) => done(null, transaction))
                                .catch((error) =>
                                    done(new InternalServerError(error), transaction)
                                );
                        }

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
     * Find All DocumentNameSetting
     *
     * @param {string} term
     *
     * @returns {Promise<DocumentNameSetting[]>}
     */
    public static findAll(query: any): Promise<DocumentNameSetting[]> {
        return new Promise((resolve, reject) => {
            let updateQuery: any = {}
            if (query.project_id) {
                updateQuery.project_id = query.project_id;
            }
            if (query.type) {
                updateQuery = {
                    ...updateQuery,
                    type: query.type
                }
            }

            DocumentNameSettingDAL.findMany(updateQuery)
                .then((docs: any) => {
                    resolve(docs);
                })
                .catch((error: any) => {
                    console.log('service kkkkkkkkkkkkkkkkkk', error);
                    reject(new InternalServerError(error));
                });
        });
    }

    /**
     * Find DocumentNameSettingBy ID
     *
     * @param {string} id
     */
    public static findByID(id: string): Promise<DocumentNameSetting> {
        return new Promise((resolve, reject) => {
            let query: any = { id: id };
            DocumentNameSettingDAL.findOne(query)
                .then((result: any) => resolve(result))
                .catch((error: any) => {
                    reject(new InternalServerError(error));
                });
        });
    }

    /**
   * update DocumentNameSetting
   * @param {int} id
   * @param {DocumentNameSetting} payload
   */
    static update(id: number, payload: DocumentNameSetting, transaction?: Transaction) {
        return new Promise((resolve, reject) => {
            async.waterfall(
                [
                    (done: Function) => {
                        DocumentNameSettingDAL.findOne({ id: id })
                            .then((document_name_setting) => {
                                if (document_name_setting) {
                                    done(null, document_name_setting);
                                } else {
                                    done(new NotFoundError("Document not found"));
                                }
                            })
                            .catch((error) => done(new InternalServerError(error)));
                    },
                    (document_name_setting: DocumentNameSetting, done: Function) => {
                        DocumentNameSettingDAL.update(document_name_setting, payload, transaction)
                            .then((updatedDocumentNameSetting) => {
                                done(null, updatedDocumentNameSetting);
                            })
                            .catch((error) => done(new BadRequestError(error)));
                    },
                ],
                (error, result) => {
                    if (error) {
                        console.error(error);
                        return reject(error);
                    }
                    resolve(result);
                }
            );
        });
    }


    /**
     * Delete DocumentNameSetting By ID
     *
     * @param {string} id
     */
    public static delete(id: string): Promise<DocumentNameSetting> {
        return new Promise((resolve, reject) => {
            let query: any = { id: id };
            DocumentNameSettingDAL.delete(query)
                .then((result: any) => resolve(result))
                .catch((error: any) => {
                    reject(new InternalServerError(error));
                });
        });
    }
}

export default DocumentNameSettingService;
