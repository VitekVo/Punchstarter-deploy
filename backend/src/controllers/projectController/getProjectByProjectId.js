import Project from '../../models/project.model.js';
import Comment from '../../models/comment.model.js';
import Donation from '../../models/donation.model.js';
import { ProjectIdFromQuerySchema } from "../../validations/projectValidation/projectValidation.js";
import logger from "../../services/logger.js";

const getProjectById = async (req, res) => {
    try {
        const { error, value } = ProjectIdFromQuerySchema.validate(req.params, { abortEarly: false });

        if (error) {
            logger.warn('Validation errors in getProjectById', { errors: error.details.map(err => err.message) });
            return res.status(400).json({
                message: "Validation errors.",
                errors: error.details.map(err => err.message),
            });
        }

        const { projectId } = value;

        const project = await Project.findById(projectId)
            .populate('creatorId', 'username')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user_id',
                    select: 'username'
                }
            })
            .exec();

        if (!project) {
            logger.warn('Project not found', { projectId });
            return res.status(404).json({ message: "Project not found." });
        }

        logger.info('Project fetched successfully', { projectId, project });

        res.status(200).json(project);
    } catch (error) {
        logger.error("Error in getProjectById:", { message: error.message, stack: error.stack });
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export default getProjectById;
