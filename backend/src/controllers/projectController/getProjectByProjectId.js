import Project from '../../models/project.model.js';
import Comment from '../../models/comment.model.js';
import Donation from '../../models/donation.model.js';
import { ProjectIdFromQuerySchema } from "../../validations/projectValidation/projectValidation.js";
const getProjectById = async (req, res) => {
    try {
        const { error, value } = ProjectIdFromQuerySchema.validate(req.query, { abortEarly: false });

        if (error) {
            return res.status(400).json({
                message: "Validation errors.",
                errors: error.details.map(err => err.message),
            });
        }

        const { projectId } = value;

        const project = await Project.findById(projectId)
            .populate('creatorId', 'username email')
            .populate('comments', "comment")
            .populate('donations')
            .exec();


        if (!project) {
            return res.status(404).json({ message: "Project not found." });
        }

        res.status(200).json(project);
    } catch (error) {
        console.error("Error in getProjectById:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export default getProjectById;
