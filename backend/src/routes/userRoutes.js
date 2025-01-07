import express from "express";
import logger from "../services/logger.js"; // Import logovacího servisu

import createUser from "../controllers/userController/createUser.js";
import getUserById from "../controllers/userController/getUserById.js";
import updateUser from "../controllers/userController/updateUser.js";
import deleteUser from "../controllers/userController/deleteUser.js";
import followProject from "../controllers/userController/followProject.js";
import loginUser from "../controllers/userController/login.js";
import logout from "../controllers/userController/logout.js";
import { getCurrentUser } from "../controllers/userController/getCurrentUser.js";

const router = express.Router();

// Vytvoření uživatele
router.post("/", (req, res, next) => {
    logger.info("Creating user initiated");
    next();
}, createUser);

// Přihlášení uživatele
router.post("/login", (req, res, next) => {
    logger.info("User login attempt", { username: req.body.username });
    next();
}, loginUser);

// Odhlášení uživatele
router.post("/logout", (req, res, next) => {
    logger.info("User logout initiated", { userId: req.user?._id });
    next();
}, logout);

// Získání informací o přihlášeném uživateli
router.post("/me", (req, res, next) => {
    logger.info("Fetching current user", { userId: req.user?._id });
    next();
}, getCurrentUser);

// Získání uživatele podle ID
router.get("/:userid", (req, res, next) => {
    logger.info("Fetching user by ID", { userId: req.params.userid });
    next();
}, getUserById);

// Aktualizace uživatele
router.put("/:userid", (req, res, next) => {
    logger.info("Updating user", { userId: req.params.userid });
    next();
}, updateUser);

// Smazání uživatele
router.delete("/:userid", (req, res, next) => {
    logger.info("Deleting user", { userId: req.params.userid });
    next();
}, deleteUser);

// Uživatelská akce: následování projektu
router.post("/:userId/follow/:projectId", (req, res, next) => {
    logger.info("User following project", { userId: req.params.userId, projectId: req.params.projectId });
    next();
}, followProject);

export default router;
