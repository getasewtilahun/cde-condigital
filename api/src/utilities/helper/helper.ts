import bcrypt from "bcrypt";
import { Status, UNITS } from "../../constants/constants";

import { toNumber, isNil } from "lodash";

import path from "path";
import { Transaction } from "sequelize";
import { createTransaction, sequelize } from "../database/sequelize";
import { InternalServerError } from "../../errors/Errors";
import async from "async";
export const hashPassword = (password: any): any => {
  const saltRounds = 10;

  return new Promise((resolve, reject) => {
    bcrypt
      .hash(password, saltRounds)
      .then((result) => resolve(result))
      .catch((error) => reject(error));
  });
};

export const parseUnit = (unit: any) => {
  let parsed = unit;
  UNITS.forEach((e) => {
    if (e.value === unit) parsed = e.name;
  });
  return parsed;
};

export const resetID = (model: any, id: any, t?: Transaction) => {
  return new Promise((resolve, reject) => {
    async.waterfall(
      [
        (done: Function) => {
          if (!t)
            createTransaction()
              .then((transaction) => done(null, transaction))
              .catch((error) => reject(new InternalServerError(error)));
          else done(null, t);
        },
        (transaction: Transaction, done: Function) => {
          model
            .findAll()
            .then((result: any) =>
              done(
                null,
                transaction,
                result.map((e: any) => e.toJSON())
              )
            )
            .catch((error: any) =>
              done(new InternalServerError(error), transaction)
            );
        },
        (transaction: Transaction, data: any[], done: Function) => {
          model
            .destroy({
              where: { id },
              transaction,
            })
            .then(() => done(null, transaction, data))
            .catch((error: any) => {
              console.log(error);
              done(new InternalServerError(error), transaction);
            });
        },
        (transaction: Transaction, data: any[], done: Function) => {
          let index = data.findIndex((e) => e.id === toNumber(id));
          if (index === data.length - 1) {
            sequelize
              .query(
                `ALTER TABLE ${model.tableName} AUTO_INCREMENT = ${
                  data[index - 1]?.id ?? 1
                }`,
                { transaction }
              )
              .then(() => done(null, transaction))
              .catch((error) =>
                done(new InternalServerError(error), transaction)
              );
          } else {
            done(null, transaction);
          }
        },
      ],
      (error, transaction: any) => {
        if (error) {
          if (!t) transaction.rollback();
          reject(error);
        } else {
          if (!t) transaction.commit();
          resolve(true);
        }
      }
    );
  });
};

export const getStatus = (payload: {
  status: number;
  type: "View" | "Check" | "Approve" | "Deleted";
}) => {
  if (payload.type === "Approve") {
    if (Status.APPROVED === payload.status) return "approved";
    else if (Status.REVISE === payload.status)
      return "instructed to be revised";
    else if (Status.PENDING === payload.status) return "reverted";
  } else if (payload.type === "Check") {
    if (Status.APPROVED === payload.status) return "checked";
    else if (Status.REVISE === payload.status)
      return "instructed to be revised";
    else if (Status.PENDING === payload.status) return "reverted";
  } else if (payload.type === "Deleted") {
    return "deleted";
  }
};

export const generatePassword = () => {
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var result = "";
  var chaactersLength = characters.length;

  for (var i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * chaactersLength));
  }
  return result;
};

const eEnglish = (x: number) => {
  return x.toLocaleString("en-US");
};

export const format = (data: any, type?: boolean): string => {
  if (!isNaN(data)) {
    if ((!isNil(data) && data !== "-") || (!isNil(data) && !isNil(type))) {
      return data === 0
        ? type
          ? "0"
          : "-"
        : eEnglish(toNumber(toNumber(data).toFixed(2)));
    } else if (data === "-") return "";
    else return "-";
  } else {
    return type ? "0" : "-";
  }
};

export const ImagePathResolver = (file: any) => {
  console.log(
    "🚀 ~ file: helper.ts ~ line 30 ~ ImagePathResolver ~ file",
    file
  );
  return path.join(file.destination, file.filename);
};

export const zeroPad = (num: any, len: number = 4): string =>
  String(num).padStart(len, "0");

export const comparePassword = (hashed_password: string, password: string) => {
  return bcrypt.compare(password, hashed_password);
};

export const containsOnlyAlphabets = (data: string) => {
  const letters = /^[A-Za-z]+$/;
  return letters.test(data);
};

export const containsOnlyNumbers = (data: string) => {
  const letters = /^[0-9]+$/;
  return letters.test(data);
};

export const generateRandomStr = (len: number = 10) => {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  let charactersLength = characters.length;
  for (var i = 0; i < len; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const getInitials = (full_name: string) => {
  if (full_name) {
    let split = full_name?.toUpperCase().split(" ");
    if (split.length === 1) {
      return `${split[0].charAt(0)}${split[0].charAt(1)}`;
    } else {
      return `${split[0].charAt(0)}${split[1].charAt(0)}`;
    }
  }
  return "";
};
