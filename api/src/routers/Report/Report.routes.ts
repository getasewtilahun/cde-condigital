import express, { Router } from "express";
import ReportController from "../../controllers/Report/Reports.controller";
import { upload_document } from "../../middlewares/FileUploader";

let router: Router = express.Router();

router.post("/", upload_document.single("file"), ReportController.create);

router.get("/", ReportController.findAll);

router.get("/:id", ReportController.findByID);

router.put("/", upload_document.single("file"), ReportController.update);

router.delete("/:id", ReportController.delete);

export default router;