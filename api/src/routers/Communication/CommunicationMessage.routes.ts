import express, { Router } from "express";
import CommunicationMessageController from "../../controllers/Communication/CommunicationMessage.controller";
import { upload_document } from "../../middlewares/FileUploader";

let router: Router = express.Router();

router.post(
  "/",
  upload_document.single("file"),
  CommunicationMessageController.create
);

router.get("/paged", CommunicationMessageController.findPaged);

router.get("/search", CommunicationMessageController.search);

router.get("/download/:id", CommunicationMessageController.download);

router.put("/", CommunicationMessageController.update);

router.delete("/:id", CommunicationMessageController.delete);

export default router;
