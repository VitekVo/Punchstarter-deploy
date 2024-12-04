import Comment from '../../models/comment.model.js';
import Project from '../../models/project.model.js';
import User from '../../models/user.model.js'; // Assuming you have a User model

const addCommentToProject = async (req, res) => {
    try {
        const { user_id, project_id, comment } = req.body;

        // Validation
        if (!user_id || !project_id || !comment) {
            return res.status(400).json({ message: "User ID, Project ID, and Comment are required." });
        }

        // Check if the user exists
        const user = await User.findById(user_id);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Check if the project exists
        const project = await Project.findById(project_id);
        if (!project) {
            return res.status(404).json({ message: "Project not found." });
        }

        // Create a new comment
        const newComment = new Comment({
            user_id,
            project_id,
            comment
        });

        // Save the comment
        await newComment.save();

        // Optionally, you could also add the comment to the project (if using the "comments" array in Project model)
        project.comments.push(newComment._id); // Assuming the Project model has an array of comment IDs
        await project.save();

        res.status(201).json({
            message: "Comment added successfully.",
            comment: newComment,
        });
    } catch (error) {
        console.error("Error in addCommentToProject:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export default addCommentToProject;