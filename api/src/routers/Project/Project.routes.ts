import express, { Router } from "express";
import { ProjectController } from "../../controllers/Project";

let router: Router = express.Router();

router.post("/", ProjectController.create);

router.get("/", ProjectController.findAll);

router.get("/", ProjectController.findPaged);

router.get("/:id", ProjectController.findByID);

router.put("/", ProjectController.update);

router.delete("/:id", ProjectController.delete);

export default router;
