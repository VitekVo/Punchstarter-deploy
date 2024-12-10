import Comment from "../../models/comment.model.js";
import { updateCommentDtoInSchema } from "../../validations/commentValidation/updateCommentValidation.js";
import { CommentIdFromQuerySchema } from "../../validations/commentValidation/commentValidation.js";

const updateComment = async (req, res) => {
  try {
    const { commentId } = req.query;
    const updates = req.body;


    const { error: commentIdError } = CommentIdFromQuerySchema.validate({ commentId }, { abortEarly: false });
    if (commentIdError) {
      return res.status(400).json({
        message: "Comment ID is invalid.",
        errors: commentIdError.details.map((err) => err.message),
      });
    }

    const { error, value } = updateCommentDtoInSchema.validate(updates, {
      abortEarly: false,
    });

    if (error) {
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
      return res.status(404).json({ message: "Comment not found." });
    }

    res.status(200).json({
      message: "Comment updated successfully",
      content: updatedComment,
    });
  } catch (error) {
    console.error("Error in updateComment:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export default updateComment;
