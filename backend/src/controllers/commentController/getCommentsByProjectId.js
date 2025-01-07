import Comment from "../../models/comment.model.js";
import { projectIdFromQuerySchema } from "../../validations/commentValidation/commentValidation.js";
import logger from "../../services/logger.js";

// name of the file has to be the same as the name of the function
const getCommentsByProjectId = async (req, res) => {
  try {
    const { error, value } = projectIdFromQuerySchema.validate(req.params, {
      abortEarly: false,
    });

    if (error) {
      logger.warn('Validation errors in getCommentsByProjectId', { errors: error.details.map((err) => err.message) });
      return res.status(400).json({
        message: "Validation errors.",
        errors: error.details.map((err) => err.message),
      });
    }

    const { projectId } = value;

    const comment = await Comment.find({ project_id: projectId });

    if (!comment) {
      logger.warn(`Comments for project with ID ${projectId} not found`);
      return res.status(404).json({ message: "Comment not found." });
    }

    logger.info(`Fetched comments for project with ID ${projectId}`);
    res.status(200).json(comment);
  } catch (error) {
    logger.error("Error in getCommentsByProjectId:", { message: error.message, stack: error.stack });
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export default getCommentsByProjectId;
