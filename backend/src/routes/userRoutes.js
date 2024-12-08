
import express from  'express';
import createUser from "../controllers/userController/createUser.js"
import getUserById from "../controllers/userController/getUserById.js"
import updateUser from "../controllers/userController/updateUser.js"
import deleteUser from "../controllers/userController/deleteUser.js"
import followProject from "../controllers/userController/followProject.js"
import loginUser from "../controllers/userController/login.js"


const router = express.Router();

router.post('/login', loginUser)
router.post('/', createUser);
router.get('/:userid', getUserById);
router.put('/:userid', updateUser);
router.delete('/:userid', deleteUser);
router.post('/:userid/follow/:projectId', followProject);

export default router;