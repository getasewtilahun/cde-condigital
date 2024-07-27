import express, { Router } from "express";
import UserLogController from "../../controllers/User/UserLog.controller";

let router: Router = express.Router();

router.post("/", UserLogController.create);

router.get("/", UserLogController.findAll);

router.get("/paged", UserLogController.findPaged);

router.put("/", UserLogController.update);

router.put("/seen", UserLogController.updateSeen);

router.delete("/:id", UserLogController.delete);

export default router;
