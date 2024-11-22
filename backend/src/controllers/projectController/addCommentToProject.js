import Project from '../../models/project.model.js';

// TODO: mozna nefunkcni lool
const addCommentToProject = async (req, res) => {
    try {
        const { projectId, commentId } = req.body;

        if (!projectId || !commentId) {
            return res.status(400).json({ message: "Project ID and Comment ID are required." });
        }

        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({ message: "Project not found." });
        }

        project.comments.push(commentId);
        await project.save();

        res.status(200).json({
            message: "Comment added successfully",
            project,
        });
    } catch (error) {
        console.error("Error in addCommentToProject:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export default addCommentToProject;
