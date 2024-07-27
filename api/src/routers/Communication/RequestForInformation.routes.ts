import express, { Router } from "express";
import RequestForInformationController from "../../controllers/Communication/RequestForInformation.controller";
import { upload_document } from "../../middlewares/FileUploader";

let router: Router = express.Router();

router.post("/", upload_document.single("file"), RequestForInformationController.create);

router.get("/", RequestForInformationController.findAll);

router.get("/:id", RequestForInformationController.findByID);

router.put("/", upload_document.single("file"), RequestForInformationController.update);

router.delete("/:id", RequestForInformationController.delete);

export default router;