import express, { Router } from "express";
import { OrganizationController } from "../../controllers/Organization";

let router: Router = express.Router();

router.post("/", OrganizationController.create);

router.get("/", OrganizationController.findAll);

router.get("/", OrganizationController.findPaged);

router.get("/:id", OrganizationController.findByID);

router.put("/", OrganizationController.update);

router.delete("/:id", OrganizationController.delete);

export default router;
