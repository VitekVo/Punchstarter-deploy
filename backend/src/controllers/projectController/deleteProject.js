import Project from '../../models/project.model.js';
import { ProjectIdFromQuerySchema } from '../../validations/projectValidation/projectValidation.js';

const deleteProject = async (req, res) => {
    try {

        const { error, value } = ProjectIdFromQuerySchema.validate(req.query, { abortEarly: false });

        if (error) {
            return res.status(400).json({
                message: "Validation errors.",
                errors: error.details.map(err => err.message),
            });
        }

        const { projectId } = value;


        const deletedProject = await Project.findByIdAndDelete(projectId);

        if (!deletedProject) {
            return res.status(404).json({ message: "Project not found." });
        }

        res.status(200).json({
            message: "Project deleted successfully",
            deletedAt: new Date(),
        });
    } catch (error) {
        console.error("Error in deleteProject:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export default deleteProject;
