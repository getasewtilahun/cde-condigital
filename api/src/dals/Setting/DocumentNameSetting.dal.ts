import { Transaction } from "sequelize/types";
import { isNil } from "lodash";
import { DocumentNameSetting } from "../../models/Setting/DocumentNameSetting.model";
class DocumentNameSettingDAL {
    /**
     * Create DocumentAssignment
     *
     * @param {DocumentNameSetting} document_status
     * @param {Transaction} transaction
     */
    static create(
        document_status: any,
        transaction?: Transaction
    ): Promise<DocumentNameSetting> {
        return new Promise((resolve, reject) => {
            DocumentNameSetting.create(document_status, {
                transaction: transaction,
            })
                .then((result) => resolve(result))
                .catch((error) => {
                    reject(error);
                });
        });
    }

    /**
     * Find Many DocumentNameSetting
     *
     * @param {any} query
     */
    static findMany(query: any) {
        console.log({ query });
        return new Promise((resolve, reject) => {
            DocumentNameSetting.findAll({
                where: query,
                include: [],
            })
                .then((result) => resolve(result))
                .catch((error) => {
                    reject(error)

                });
        });
    }

    /**
     * Find One DocumentNameSetting
     *
     * @param {any} query
     */
    static findOne(query: any) {
        return new Promise((resolve, reject) => {
            DocumentNameSetting.findOne({
                where: query,
                include: [],
            })
                .then((result) => resolve(result))
                .catch((error) => reject(error));
        });
    }

    /**
     * Find One DocumentNameSetting
     *
     * @param {any} query
     */
    static findId(query: any) {
        return new Promise((resolve, reject) => {
            DocumentNameSetting.findOne({
                where: query,
            })
                .then((result) => resolve(result))
                .catch((error) => reject(error));
        });
    }

    /**
     * Update DocumentNameSetting
     * @param {DocumentNameSetting} document_status
     * @param {Object} payload
     */
    static update(
        document_status: DocumentNameSetting,
        payload: DocumentNameSetting,
        transaction?: Transaction
    ) {
        return new Promise((resolve, reject) => {
            if (document_status) {
                if (payload.project_code) document_status.project_code = payload.project_code;
                if (payload.Originator) document_status.Originator = payload.Originator;
                if (payload.functional_breakdown) document_status.functional_breakdown = payload.functional_breakdown;
                if (payload.spatial) document_status.spatial = payload.spatial;
                if (payload.discipline) document_status.discipline = payload.discipline;
                if (payload.form) document_status.form = payload.form;
                if (payload.number) document_status.number = payload.number;

                document_status
                    .save({ transaction })
                    .then((doc) => resolve(doc))
                    .catch((error) => reject(error));
            } else {
                resolve(null);
            }
        });
    }

    /**
     * Delete DocumentNameSetting
     *
     * @param {Object} query
     */
    static delete(query: any) {
        return new Promise((resolve, reject) => {
            DocumentNameSetting.destroy({ where: query })
                .then((result) => resolve(true))
                .catch((error) => reject(error));
        });
    }
}

export default DocumentNameSettingDAL;
