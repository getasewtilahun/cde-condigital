import express, { Router } from "express";
import UserSeenController from "../../controllers/User/UserSeen.controller";

let router: Router = express.Router();

router.post("/", UserSeenController.create);

router.get("/", UserSeenController.findAll);

router.get("/", UserSeenController.findPaged);

router.get("/:id", UserSeenController.findByID);

router.put("/", UserSeenController.update);

router.delete("/:id", UserSeenController.delete);

export default router;
