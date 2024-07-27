import {
    InternalServerError,
    BadRequestError,
    NotFoundError,
} from "../../errors/Errors";
import { createTransaction, } from "../../utilities/database/sequelize";
import async from "async";
import { Transaction } from "sequelize/types";
import MessageDAL from "../../dals/Communication/Message.dal";
import DocumentDAL from "../../dals/Document.dal";
import { Message } from "../../models/Communication/Message.model";

class MessageService {
    /**
     * Create  Message
     *
     * @param {Message} message
     * @param {Transaction} transaction
     */

    static create(message: any, transaction?: Transaction): Promise<any> {
        return new Promise((resolve, reject) => {
            async.waterfall(
                [
                    (done: Function) => {
                        createTransaction()
                            .then((transaction) => done(null, transaction))
                            .catch((error) => reject(new InternalServerError(error)));
                    },
                    (transaction: Transaction, done: Function) => {
                        let document = {
                            name: `Document Assignment (${message.name})`,
                            project_id: message.project_id,
                            user_id: message.user_id,
                            url: message.url,
                            is_private: true,
                            type: "Document Assignment",
                            size: message.size,
                        };

                        console.log("this is  request for information service");
                        console.log(document);

                        DocumentDAL.create(document, transaction)
                            .then((result) => done(null, transaction, result.id))
                            .catch((error) => {
                                console.log("ddddddddddddddddddddddd", error);
                                done(new InternalServerError(error), transaction)
                            }
                            );
                    },

                    (transaction: Transaction, document_id: number, done: Function) => {
                        console.log('Document ID', document_id);
                        MessageDAL.create({ ...message, document_id }, transaction)
                            .then((result) => done(null, transaction, result.id))
                            .catch((error) =>
                                done(new InternalServerError(error), transaction)
                            );
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
     * Find All Message
     *
     * @param {string} term
     *
     * @returns {Promise<Message[]>}
     */
    public static findAll(query: any): Promise<Message[]> {
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

            MessageDAL.findMany(updateQuery)
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
     * Find MessageBy ID
     *
     * @param {string} id
     */
    public static findByID(id: string): Promise<Message> {
        return new Promise((resolve, reject) => {
            let query: any = { id: id };
            MessageDAL.findOne(query)
                .then((result: any) => resolve(result))
                .catch((error: any) => {
                    reject(new InternalServerError(error));
                });
        });
    }

    /**
    * Update Message
    *
    * @param {number} id - ID of the Message to update
    * @param {Message} payload - Updated data
    * @param {Transaction} transaction - Optional transaction for Sequelize
    */
    static update(id: number, payload: Message, transaction?: Transaction): Promise<any> {
        console.log("Updating Message with id:", id);
        console.log("Updating Message Data:", payload);

        return new Promise((resolve, reject) => {
            async.waterfall(
                [
                    // Step 1: Find the existing Message by ID
                    (done: Function) => {
                        MessageDAL.findOne({ id: id })
                            .then((message) => {
                                if (message) {
                                    done(null, message);
                                } else {
                                    done(new NotFoundError("Message not found"));
                                }
                            })
                            .catch((error) => done(new InternalServerError(error)));
                    },
                    // Step 2: Create a transaction if not provided
                    (message: Message, done: Function) => {
                        if (!transaction) {
                            createTransaction()
                                .then((newTransaction) => done(null, message, newTransaction))
                                .catch((error) => done(new InternalServerError(error)));
                        } else {
                            done(null, message, transaction);
                        }
                    },
                    // Step 3: Create a new Document
                    (message: Message, transaction: Transaction, done: Function) => {
                        if (payload.size) {
                            let document = {
                                name: `Request For Information (${payload.name})`,
                                project_id: payload.project_id,
                                user_id: payload.user_id,
                                url: payload.url,
                                is_private: true,
                                type: "Request For Information",
                                size: payload.size,
                            };

                            DocumentDAL.create(document, transaction)
                                .then((createdDocument) => done(null, message, createdDocument.id, transaction))
                                .catch((error) => done(new InternalServerError(error), transaction));
                        } else {
                            // No document creation needed if size is not provided
                            done(null, message, null, transaction);
                        }
                    },
                    // Step 4: Update the Message with document_id if created
                    (message: Message, document_id: any, transaction: Transaction, done: Function) => {
                        if (document_id) {
                            payload.document_id = document_id; // Update payload with document_id
                        }

                        MessageDAL.update(message, payload, transaction)
                            .then((updatedMessage) => {
                                done(null, updatedMessage, transaction);
                            })
                            .catch((error) => done(new BadRequestError(error), transaction));
                    },
                ],
                // Final callback to handle errors and resolve/reject the promise
                (error: any, result: any, transaction?: Transaction) => {
                    if (error) {
                        if (transaction) {
                            transaction.rollback(); // Rollback transaction on error
                        }
                        reject(error);
                    } else {
                        if (transaction) {
                            transaction.commit(); // Commit transaction on success
                        }
                        resolve(result);
                    }
                }
            );
        });
    }

    /**
     * Delete Message By ID
     *
     * @param {string} id
     */
    public static delete(id: string): Promise<Message> {
        return new Promise((resolve, reject) => {
            let query: any = { id: id };
            MessageDAL.delete(query)
                .then((result: any) => resolve(result))
                .catch((error: any) => {
                    reject(new InternalServerError(error));
                });
        });
    }
}

export default MessageService;
