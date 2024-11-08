import express from  'express';
import { createProject, getProjectById, updateProject, deleteProject, addCommentToProject } from '../controllers/projectController.js';


 const router = express.Router();

router.post('/', createProject);
router.get('/:projectId', getProjectById);
router.put('/:projectId', updateProject);
router.delete('/:projectId', deleteProject);
router.post('/:projectId/comments/:commentId', addCommentToProject);

export default router;
