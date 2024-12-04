import express from  'express';
import { createProject } from '../controllers/projectController/createProject.js';
import getProjectById from '../controllers/projectController/getProjectByProjectId.js';
import updateProject from '../controllers/projectController/updateProject.js';
import deleteProject from '../controllers/projectController/deleteProject.js';
import addCommentToProject from '../controllers/projectController/addCommentToProject.js';
import loadProjectsByLimit from '../controllers/projectController/loadProjectsByLimits.js';


 const router = express.Router();

router.post('/', createProject);
router.get('/:projectId', getProjectById);
router.get('/load/:limit',loadProjectsByLimit );
router.put('/:projectId', updateProject);
router.delete('/:projectId', deleteProject);
router.post('/addComment', addCommentToProject);

export default router;
