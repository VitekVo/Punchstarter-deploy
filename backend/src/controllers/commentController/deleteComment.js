import Comment from "../../models/comment.model.js";
import { CommentIdFromQuerySchema } from "../../validations/commentValidation/commentValidation.js";
import logger from "../../services/logger.js";

const deleteComment = async (req, res) => {
  try {
    const { error, value } = CommentIdFromQuerySchema.validate(req.query, {
      abortEarly: false,
    });

    if (error) {
      logger.warn('Validation errors in deleteComment', { errors: error.details.map((err) => err.message) });
      return res.status(400).json({
        message: "Validation errors.",
        errors: error.details.map((err) => err.message),
      });
    }

    const { commentId } = value;

    const deletedComment = await Comment.findByIdAndDelete(commentId);

    if (!deletedComment) {
      logger.warn(`Comment with ID ${commentId} not found`);
      return res.status(404).json({ message: "Comment not found." });
    }

    logger.info(`Comment with ID ${commentId} deleted successfully`);
    res.status(200).json({
      message: "Comment deleted successfully",
      deletedAt: new Date(),
    });
  } catch (error) {
    logger.error("Error in deleteComment:", { message: error.message, stack: error.stack });
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export default deleteComment;
