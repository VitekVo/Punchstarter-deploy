import Comment from "../../models/comment.model";
import { createCommentDtoInSchema } from "../../validations/commentValidation/commentValidation";

const createNewComment = async (req, res) => {
  try {
    const { error, value } = createCommentDtoInSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({
        message: "Validation errors.",
        errors: error.details.map((err) => err.message),
      });
    }

    if (!res.locals.user) {
      return res.status(401).json({ message: "Unauthorized. User not found." });
    }

    const { projectId, content } = value;

    const newComment = new Comment({
      projectId,
      userId: res.locals.user._id,
      content,
    });

    const savedComment = await newComment.save();

    res.status(201).json({
      message: "Comment created successfully",
      content: savedComment,
    });
  } catch (error) {
    console.error("Error in createProject:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const createComment = createNewComment;
