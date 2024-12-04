import Comment from '../../models/comment.model.js';
import Project from '../../models/project.model.js';

const createComment = async (req, res) => {
  try {
    const { text, projectId, userId } = req.body;

    // Validation
    if (!text || !projectId || !userId) {
      return res.status(400).json({ message: "Text, Project ID, and User ID are required." });
    }

    // Check if the project exists
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }

    // Create and save the comment
    const comment = new Comment({
      comment: text,
      project_id: projectId,
      user_id: userId,
    });
    await comment.save();

    // Add the comment to the project
    project.comments.push(comment._id);
    await project.save();

    res.status(201).json({
      message: "Comment created and added to project successfully.",
      comment,
    });
  } catch (error) {
    console.error("Error in createComment:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export default createComment;

