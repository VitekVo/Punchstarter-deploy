import express from "express";
import logger from "../services/logger.js"; // Import logovacího servisu

import { createProject } from "../controllers/projectController/createProject.js";
import getProjectById from "../controllers/projectController/getProjectByProjectId.js";
import { updateProjectHandler } from "../controllers/projectController/updateProject.js";
import deleteProject from "../controllers/projectController/deleteProject.js";
import loadProjectsByLimit from "../controllers/projectController/loadProjectsByLimits.js";

const router = express.Router();

// Vytvoření projektu
router.post("/", (req, res, next) => {
    logger.info("Creating project initiated");
    next();
}, createProject);

// Načtení projektů s limitem
router.get("/load", (req, res, next) => {
    logger.info("Loading projects with limit");
    next();
}, loadProjectsByLimit);

// Získání projektu podle ID
router.get("/:projectId", (req, res, next) => {
    logger.info("Fetching project by ID", { projectId: req.params.projectId});
    next();
}, getProjectById);

// Aktualizace projektu
router.put("/:projectId", (req, res, next) => {
    logger.info("Updating project", { projectId: req.params.projectId });
    next();
}, updateProjectHandler);

// Smazání projektu
router.delete("/:projectId", (req, res, next) => {
    logger.info("Deleting project", { projectId: req.params.projectId });
    next();
}, deleteProject);

export default router;
