import express, { Router } from "express";
import ScheduleMeetingController from "../../controllers/Communication/ScheduleMeeting.controller";
import { upload_document } from "../../middlewares/FileUploader";

let router: Router = express.Router();

router.post("/", upload_document.single("file"), ScheduleMeetingController.create);

router.get("/", ScheduleMeetingController.findAll);

router.get("/:id", ScheduleMeetingController.findByID);

router.put("/", upload_document.single("file"), ScheduleMeetingController.update);

router.delete("/:id", ScheduleMeetingController.delete);

export default router;