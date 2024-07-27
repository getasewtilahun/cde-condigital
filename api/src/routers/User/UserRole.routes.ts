import express, { Router } from "express";
import { UserRoleController } from "../../controllers/User";

let router: Router = express.Router();

router.post("/", UserRoleController.create);

router.get("/", UserRoleController.findAll);

router.get("/", UserRoleController.findPaged);

router.get("/:id", UserRoleController.findByID);

router.put("/", UserRoleController.update);

router.delete("/:id", UserRoleController.delete);

export default router;
