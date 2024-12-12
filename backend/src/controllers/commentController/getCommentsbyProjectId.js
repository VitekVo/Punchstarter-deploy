import Comment from "../../models/comment.model.js";
import { projectIdFromQuerySchema } from "../../validations/commentValidation/commentValidation.js";

// name of the file has to be the same as the name of the function
const getCommentsByProjectId = async (req, res) => {
  try {
    const { error, value } = projectIdFromQuerySchema.validate(req.query, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({
        message: "Validation errors.",
        errors: error.details.map((err) => err.message),
      });
    }

    const { projectId } = value;

    const comment = await Comment.find({ project_id: projectId });

    if (!comment) {
      return res.status(404).json({ message: "Comment not found." });
    }

    res.status(200).json(comment);
  } catch (error) {
    console.error("Error in getCommentByProjectId:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export default getCommentsByProjectId;
