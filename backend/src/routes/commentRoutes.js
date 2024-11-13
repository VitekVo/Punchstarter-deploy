import express from  'express';

import { createComment, getCommentsByProjectId, updateComment, deleteComment } from '../controllers/commentController.js';


 const router = express.Router();

 router.post('/', createComment);
 router.get('/:projectId', getCommentsByProjectId);
 router.put('/:commentId', updateComment);
 router.delete('/:commentId', deleteComment);
//router.post('/:projectId/comments/:commentId', addCommentToProject);

export default router;