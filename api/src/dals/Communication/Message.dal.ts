import { Transaction } from "sequelize/types";
import { Message } from "../../models/Communication/Message.model";
import { Document } from "../../models/Document";
class MessageDAL {
    /**
     * Create Message
     *
     * @param {Message} message
     * @param {Transaction} transaction
     */
    static create(
        message: any,
        transaction?: Transaction
    ): Promise<Message> {
        return new Promise((resolve, reject) => {

            console.log('dallllllllllllllllllllll');
            Message.create(message, {
                transaction: transaction,
            })
                .then((result) => resolve(result))
                .catch((error) => {
                    reject(error);
                });
        });
    }

    /**
     * Find Many Message
     *
     * @param {any} query
     */
    static findMany(query: any) {
        console.log({ query });
        return new Promise((resolve, reject) => {
            Message.findAll({
                where: query,
                include: [
                    Document,
                ],
            })
                .then((result) => resolve(result))
                .catch((error) => {
                    console.log('daldaladallllllllllllllllllllllllll', error);
                    reject(error)

                });
        });
    }

    /**
     * Find One Message
     *
     * @param {any} query
     */
    static findOne(query: any) {
        return new Promise((resolve, reject) => {
            Message.findOne({
                where: query,
                include: [
                ],
            })
                .then((result) => resolve(result))
                .catch((error) => reject(error));
        });
    }

    /**
     * Find One Message
     *
     * @param {any} query
     */
    static findId(query: any) {
        return new Promise((resolve, reject) => {
            Message.findOne({
                where: query,
            })
                .then((result) => resolve(result))
                .catch((error) => reject(error));
        });
    }

    /**
     * Update Message
     * @param {Message} message
     * @param {Object} payload
     */
    static update(
        message: Message,
        payload: Message,
        transaction?: Transaction
    ) {
        return new Promise((resolve, reject) => {
            if (message) {
                if (payload.project_id) message.project_id = payload.project_id;
                if (payload.document_id) message.document_id = payload.document_id;
                if (payload.user_id) message.user_id = payload.user_id;
                if (payload.message) message.message = payload.message;
                if (payload.seen) message.seen = payload.seen;
                if (payload.from) message.from = payload.from;
                if (payload.to) message.to = payload.to;
                message
                    .save({ transaction })
                    .then((doc) => resolve(doc))
                    .catch((error) => reject(error));
            } else {
                resolve(null);
            }
        });
    }

    /**
     * Delete Message
     *
     * @param {Object} query
     */
    static delete(query: any) {
        return new Promise((resolve, reject) => {
            Message.destroy({ where: query })
                .then((result) => resolve(true))
                .catch((error) => reject(error));
        });
    }
}

export default MessageDAL;
