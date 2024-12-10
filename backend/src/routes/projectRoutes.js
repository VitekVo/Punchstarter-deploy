import express from "express";
import { createProject } from "../controllers/projectController/createProject.js";
import getProjectById from "../controllers/projectController/getProjectByProjectId.js";
import { updateProjectHandler } from "../controllers/projectController/updateProject.js";
import deleteProject from "../controllers/projectController/deleteProject.js";
import loadProjectsByLimit from "../controllers/projectController/loadProjectsByLimits.js";

const router = express.Router();

router.post("/", createProject);
router.get("/load", loadProjectsByLimit);
router.get("/:projectId", getProjectById);
router.put("/:projectId", updateProjectHandler);
router.delete("/:projectId", deleteProject);

export default router;
