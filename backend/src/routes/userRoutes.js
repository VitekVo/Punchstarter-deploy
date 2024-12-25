import express from "express";
import createUser from "../controllers/userController/createUser.js";
import getUserById from "../controllers/userController/getUserById.js";
import updateUser from "../controllers/userController/updateUser.js";
import deleteUser from "../controllers/userController/deleteUser.js";
import followProject from "../controllers/userController/followProject.js";
import loginUser from "../controllers/userController/login.js";
import logout from "../controllers/userController/logout.js";
import { getCurrentUser } from "../controllers/userController/getCurrentUser.js";

const router = express.Router();

router.post("/", createUser);
router.post("/login", loginUser);
router.post("/logout", logout);
router.post("/me", getCurrentUser);
router.get("/:userid", getUserById);
router.put("/:userid", updateUser);
router.delete("/:userid", deleteUser);
router.post("/:userId/follow/:projectId", followProject);

export default router;
