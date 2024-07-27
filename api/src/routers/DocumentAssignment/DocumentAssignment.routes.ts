import express, { Router } from "express";
import DocumentAssignmentController from "../../controllers/DocumentAssignment/DocumentAssignment.controller";
import { upload_document } from "../../middlewares/FileUploader";
import { Document } from '../../models/Document';

let router: Router = express.Router();

router.post("/", upload_document.single("file"), DocumentAssignmentController.create);

router.get("/", DocumentAssignmentController.findAll);

router.get("/:id", DocumentAssignmentController.findByID);

router.put("/", upload_document.single("file"), DocumentAssignmentController.update);

router.delete("/:id", DocumentAssignmentController.delete);

export default router;