import express, { Router } from "express";
import MessageController from "../../controllers/Communication/Message.controller";
import { upload_document } from "../../middlewares/FileUploader";

let router: Router = express.Router();

router.post("/", upload_document.single("file"), MessageController.create);

router.get("/", MessageController.findAll);

router.get("/:id", MessageController.findByID);

router.put("/", upload_document.single("file"), MessageController.update);

router.delete("/:id", MessageController.delete);

export default router;