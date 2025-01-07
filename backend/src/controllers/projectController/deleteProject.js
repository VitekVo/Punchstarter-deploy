import Project from '../../models/project.model.js';
import { ProjectIdFromQuerySchema } from '../../validations/projectValidation/projectValidation.js';
import logger from "../../services/logger.js";

const deleteProject = async (req, res) => {
    try {
        const { error, value } = ProjectIdFromQuerySchema.validate(req.params, { abortEarly: false });

        if (error) {
            logger.warn('Validation errors in deleteProject', { errors: error.details.map(err => err.message) });
            return res.status(400).json({
                message: "Validation errors.",
                errors: error.details.map(err => err.message),
            });
        }

        const { projectId } = value;

        const deletedProject = await Project.findByIdAndDelete(projectId);

        if (!deletedProject) {
            logger.warn('Project not found for deletion', { projectId });
            return res.status(404).json({ message: "Project not found." });
        }

        logger.info('Project deleted successfully', { projectId, deletedAt: new Date() });

        res.status(200).json({
            message: "Project deleted successfully",
            deletedAt: new Date(),
        });
    } catch (error) {
        logger.error("Error in deleteProject:", { message: error.message, stack: error.stack });
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export default deleteProject;
