import Project from '../../models/project.model.js';
import loadProjectsDtoInQuerySchema from '../../validations/projectValidation/loadProjectsByLimitValidation.js';

const loadProjectsByLimit = async (req, res) => {
    try {

        const { error, value } = loadProjectsDtoInQuerySchema.validate(req.query, { abortEarly: false });

        if (error) {
            return res.status(400).json({
                message: "Validation errors.",
                errors: error.details.map(err => err.message),
            });
        }

        const { limit } = value;


        const projects = await Project.find()
            .limit(limit)
            .populate('creatorId', 'username')
            .populate({
                path: 'comments', // Populate the comments array
                populate: {
                    path: 'user_id', // Populate the userId within each comment
                    select: 'username' // Select only the fields you need
                }
            })
            .exec();


        if (!projects || projects.length === 0) {
            return res.status(404).json({ message: "No projects found." });
        }

        res.status(200).json({
            message: `${projects.length} project(s) found.`,
            projects,
        });
    } catch (error) {
        console.error("Error in getProjects:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export default loadProjectsByLimit;
