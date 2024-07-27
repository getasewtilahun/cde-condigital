import mkdirp from "mkdirp";
import moment from "moment";
import multer from "multer";
import mime from "mime-types";
import { Messages } from "../errors/Messages";
import { Request } from "express";

/**
 * Application Storage
 */
let application_storage = multer.diskStorage({
  destination: (request, file, callback) => {
    mkdirp("uploads/").then(() => callback(null, "uploads/"));
  },
  filename: (request, file, callback) => {
    console.log(getFilename(file), "file");
    callback(null, `${request.body.rand_key}-${file.originalname}`);
  },
});

/**
 * Storage
 */
let storage = multer.diskStorage({
  destination: (request: Request, file: Express.Multer.File, callback) => {
    mkdirp("uploads/").then(() => callback(null, "uploads/"));
  },
  filename: (request: Request, file: Express.Multer.File, callback) => {
    console.log(getFilename(file), "file");
    callback(null, getFilename(file));
  },
});

let signature_storage = multer.diskStorage({
  destination: (request, file, callback) => {
    mkdirp("uploads/signatures").then(() =>
      callback(null, "uploads/signatures")
    );
  },
  filename: (request, file, callback) => {
    callback(null, getSignatureFilename(file));
  },
});

/**
 * Contract Payment Receipts
 */
let CP_receipt_storage = multer.diskStorage({
  destination: (request, file, callback) => {
    mkdirp("uploads/CP_Receipts").then(() =>
      callback(null, "uploads/CP_Receipts")
    );
  },
  filename: (request, file, callback) => {
    callback(
      null,
      `${moment().unix()}-${file.originalname.toString().replace(" ", "_")}`
    );
  },
});

/**
 * SHE
 */
let she_storage = multer.diskStorage({
  destination: (request, file, callback) => {
    mkdirp("uploads/she").then(() => callback(null, "uploads/she"));
  },
  filename: (request, file, callback) => {
    callback(null, `${moment().unix()}-${file.originalname}`);
  },
});

/**
 * media
 */
let media_storage = multer.diskStorage({
  destination: (request, file, callback) => {
    mkdirp("uploads/media").then(() => callback(null, "uploads/media"));
  },
  filename: (request, file, callback) => {
    callback(null, `${moment().unix()}-${file.originalname}`);
  },
});

/**
 * rfi
 */
let rfi_storage = multer.diskStorage({
  destination: (request, file, callback) => {
    mkdirp("uploads/rfi").then(() => callback(null, "uploads/rfi"));
  },
  filename: (request, file, callback) => {
    // console.log(file);
    callback(null, getSignatureFilename(file));
  },
});

/**
 * rfi
 */
export const rfi_upload = multer({
  storage: rfi_storage,
  limits: { fileSize: 1000000 },
  fileFilter: (request, file, callback: Function) => {
    callback(null, true);
  },
});

/**
 * reports
 */
let report_storage = multer.diskStorage({
  destination: (request, file, callback) => {
    mkdirp("uploads/report").then(() => callback(null, "uploads/report"));
  },
  filename: (request, file, callback) => {
    callback(null, `${moment().unix()}-${file.originalname}`);
  },
});

export const report_upload = multer({
  storage: report_storage,
  limits: { fileSize: 1000000 },
  fileFilter: (request, file, callback: Function) => {
    callback(null, true);
  },
});

/**
 * media
 */
export const media_upload = multer({
  storage: media_storage,
  limits: { fileSize: 10000000000 },
  fileFilter: (request, file, callback: Function) => {
    console.log(file);
    const allowedExtensions = [
      "png",
      "jpeg",
      "jpg",
      "mp4",
      "mkv",
      "gif",
      "mov",
      "mpeg",
    ];
    if (allowedExtensions.includes(file.originalname.split(".").pop()!)) {
      callback(null, true);
    } else {
      callback(new Error(Messages.FILES_NOT_VALID));
    }
  },
});

/**
 *
 * @param file she uploads
 */
export const she_upload = multer({
  storage: she_storage,
  limits: { fileSize: 1000000 },
  fileFilter: (request, file, callback: Function) => {
    callback(null, true);
  },
});

/**
 * Retrieve Filename
 *
 * @param {File} file
 */
let getSignatureFilename = (file: any) => {
  return `${moment().unix()}-${file.originalname}.png`;
};

let document_storage = multer.diskStorage({
  destination: (request, file, callback) => {
    mkdirp("documents/").then(() => callback(null, "documents/"));
  },
  filename: (request, file, callback) => {
    console.log(getFilename(file), "file");
    callback(null, getFilename(file));
  },
});

/**
 * Retrieve Filename
 *
 * @param {File} file
 */
let getFilename = (file: any) => {
  return `${moment().unix()}-${file.originalname}`;
};

/**
 * Upload Middleware
 */
let upload = multer({
  storage: storage,
  fileFilter: (request, file, callback: Function) => {
    if (file.mimetype === mime.lookup("xlsx")) {
      callback(null, true);
    } else {
      return callback(new Error("Only Excel files are supported"), false);
    }
  },
});

/**
 * Upload Middleware
 */
export const upload_document = multer({
  storage: storage,
  fileFilter: (
    request: Request,
    file: Express.Multer.File,
    callback: Function
  ) => {
    callback(null, true);
  },
});

/**
 * Upload Middleware
 */
export const upload_application = multer({
  storage: application_storage,
  fileFilter: (request, file, callback: Function) => {
    callback(null, true);
  },
});

/**
 * Valid Image Mime Types
 */
const MimeTypes = ["image/png", "image/jpg", "image/jpeg"];

export const image_document = multer({
  storage: signature_storage,
  fileFilter: (request, file, callback) => {
    if (MimeTypes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error(Messages.IMAGE_INVALID_TYPE));
    }
  },
});

export const image_receipts = multer({
  storage: CP_receipt_storage,
  fileFilter: (request, file, callback) => {
    if (MimeTypes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error(Messages.IMAGE_INVALID_TYPE));
    }
  },
});

export default upload;
