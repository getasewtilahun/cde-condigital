import express, { Router } from "express";
import DocumentStatusController from "../../controllers/DocumentAssignment/DocumentStatus.controller";
import { upload_document } from "../../middlewares/FileUploader";

let router: Router = express.Router();

router.post("/", DocumentStatusController.create);

router.get("/", DocumentStatusController.findAll);

router.get("/:id", DocumentStatusController.findByID);

router.put("/", DocumentStatusController.update);

router.delete("/:id", DocumentStatusController.delete);

export default router;