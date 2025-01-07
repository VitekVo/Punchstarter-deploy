import express from "express";
import logger from "../services/logger.js"; // import logger

import createComment from "../controllers/commentController/createComment.js";
import getCommentsByProjectId from "../controllers/commentController/getCommentsByProjectId.js";
import updateComment from "../controllers/commentController/updateComment.js";
import deleteComment from "../controllers/commentController/deleteComment.js";

const router = express.Router();

// Route pro vytvoření komentáře
router.post("/", (req, res, next) => {
    logger.info("Creating a new comment");
    try {
        createComment(req, res);
    } catch (error) {
        logger.error("Error in creating comment", { errorMessage: error.message });
        next(error);
    }
});

// Route pro získání komentářů podle projectId
router.get("/:projectId", (req, res, next) => {
    logger.info("Fetching comments for project", { projectId: req.params.projectId });
    try {
        getCommentsByProjectId(req, res);
    } catch (error) {
        logger.error("Error fetching comments", { errorMessage: error.message });
        next(error);
    }
});

// Route pro aktualizaci komentáře
router.put("/:commentId", (req, res, next) => {
    logger.info("Updating comment", { commentId: req.params.commentId });
    try {
        updateComment(req, res);
    } catch (error) {
        logger.error("Error updating comment", { errorMessage: error.message });
        next(error);
    }
});

// Route pro smazání komentáře
router.delete("/:commentId", (req, res, next) => {
    logger.info("Deleting comment", { commentId: req.params.commentId });
    try {
        deleteComment(req, res);
    } catch (error) {
        logger.error("Error deleting comment", { errorMessage: error.message });
        next(error);
    }
});

export default router;
