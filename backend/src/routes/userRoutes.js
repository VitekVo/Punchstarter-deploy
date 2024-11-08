
import express from  'express';
import { createUser, getUserById, updateUser, deleteUser, followProject } from '../controllers/userController.js';

const router = express.Router();

router.post('/', createUser);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/:userid/follow/:projectId', followProject);

export default router;