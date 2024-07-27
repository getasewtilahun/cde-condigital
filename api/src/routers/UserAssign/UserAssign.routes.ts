import express, { Router } from "express";
import UserAssignController from "../../controllers/UserAssign/UserAssign.controller";

let router: Router = express.Router();

router.post("/", UserAssignController.create);

router.get("/", UserAssignController.findAll);

router.get("/:id", UserAssignController.findByID);

router.put("/", UserAssignController.update);

router.delete("/:id", UserAssignController.delete);

export default router;
