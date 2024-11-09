
import express from  'express';
import { createUser, getUserById, updateUser, deleteUser, followProject } from '../controllers/userController.js';

const router = express.Router();

router.post('/', createUser);
router.get('/:userid', getUserById);
router.put('/:userid', updateUser);
router.delete('/:userid', deleteUser);
router.post('/:userid/follow/:projectId', followProject);

export default router;