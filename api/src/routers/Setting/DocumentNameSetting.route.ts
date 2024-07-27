import express, { Router } from "express";
import DocumentNameSettingController from "../../controllers/Setting/DocumentNameSetting.controller";

let router: Router = express.Router();

router.post("/", DocumentNameSettingController.create);

router.get("/", DocumentNameSettingController.findAll);

router.get("/:id", DocumentNameSettingController.findByID);

router.put("/", DocumentNameSettingController.update);

router.delete("/:id", DocumentNameSettingController.delete);

export default router;