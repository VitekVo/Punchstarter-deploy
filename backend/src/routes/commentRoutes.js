import express from "express";

import createComment from "../controllers/commentController/createComment.js";
import getCommentsByProjectId from "../controllers/commentController/getCommentsByProjectId.js";
import updateComment from "../controllers/commentController/updateComment.js";
import deleteComment from "../controllers/commentController/deleteComment.js";

const router = express.Router();

router.post("/", createComment);
router.get("/:projectId", getCommentsByProjectId);
router.put("/:commentId", updateComment);
router.delete("/:commentId", deleteComment);

export default router;
