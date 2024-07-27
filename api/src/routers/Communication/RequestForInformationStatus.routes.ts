import express, { Router } from "express";
import RequestForInformationStatusController from "../../controllers/Communication/RequestForInformationStatus.controller";
import { upload_document } from "../../middlewares/FileUploader";

let router: Router = express.Router();

router.post("/", upload_document.single("file"), RequestForInformationStatusController.create);

router.get("/", RequestForInformationStatusController.findAll);

router.get("/:id", RequestForInformationStatusController.findByID);

router.put("/", upload_document.single("file"), RequestForInformationStatusController.update);

router.delete("/:id", RequestForInformationStatusController.delete);

export default router;