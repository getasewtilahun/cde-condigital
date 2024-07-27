import express, { Router } from "express";
import CommunicationGroupController from "../../controllers/Communication/CommunicationGroup.controller";

let router: Router = express.Router();

router.post("/", CommunicationGroupController.create);

router.get("/", CommunicationGroupController.findAll);

router.get("/users", CommunicationGroupController.findAllUsers);

router.put("/users", CommunicationGroupController.updateGroupMembers);

router.put("/last-seen", CommunicationGroupController.updateLastSeen);

router.put("/", CommunicationGroupController.update);

router.delete("/:id", CommunicationGroupController.delete);

export default router;
