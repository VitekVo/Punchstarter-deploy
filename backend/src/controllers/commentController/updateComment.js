import Comment from "../../models/comment.model.js";
import { updateCommentDtoInSchema } from "../../validations/commentValidation/updateCommentValidation.js";
import { CommentIdFromQuerySchema } from "../../validations/commentValidation/commentValidation.js";
import logger from "../../services/logger.js";

const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const updates = req.body;

    const { error: commentIdError } = CommentIdFromQuerySchema.validate({ commentId }, { abortEarly: false });
    if (commentIdError) {
      logger.warn('Invalid comment ID', { commentId, errors: commentIdError.details.map((err) => err.message) });
      return res.status(400).json({
        message: "Comment ID is invalid.",
        errors: commentIdError.details.map((err) => err.message),
      });
    }

    const { error, value } = updateCommentDtoInSchema.validate(updates, {
      abortEarly: false,
    });

    if (error) {
      logger.warn('Validation errors in updateComment', { errors: error.details.map((err) => err.message) });
      return res.status(400).json({
        message: "Validation errors.",
        errors: error.details.map((err) => err.message),
      });
    }

    const updatedComment = await Comment.findByIdAndUpdate(commentId, value, {
      new: true,
      runValidators: true,
    });

    if (!updatedComment) {
      logger.warn(`Comment with ID ${commentId} not found`);
      return res.status(404).json({ message: "Comment not found." });
    }

    logger.info(`Comment with ID ${commentId} updated successfully`);
    res.status(200).json({
      message: "Comment updated successfully",
      content: updatedComment,
    });
  } catch (error) {
    logger.error("Error in updateComment:", { message: error.message, stack: error.stack });
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export default updateComment;
