import Comment from "../../models/comment.model.js";
import { CommentIdFromQuerySchema } from "../../validations/commentValidation/commentValidation.js";

const deleteComment = async (req, res) => {
  try {
    const { error, value } = CommentIdFromQuerySchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({
        message: "Validation errors.",
        errors: error.details.map((err) => err.message),
      });
    }

    const { commentId } = value;

    const deletedComment = await Comment.findByIdAndDelete(commentId);

    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found." });
    }

    res.status(200).json({
      message: "Comment deleted successfully",
      deletedAt: new Date(),
    });
  } catch (error) {
    console.error("Error in deleteComment:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export default deleteComment;
