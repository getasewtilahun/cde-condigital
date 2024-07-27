import express, { Router } from "express";
import DocumentController from "../controllers/Document.controller";
import { upload_document } from "../middlewares/FileUploader";
let router: Router = express.Router();

router.post("/", upload_document.single("file"), DocumentController.create);

router.get("/", DocumentController.findAll);

router.get("/download/:id", DocumentController.download);

router.put("/:id", DocumentController.update);

router.delete("/:id", DocumentController.delete);

export default router;
