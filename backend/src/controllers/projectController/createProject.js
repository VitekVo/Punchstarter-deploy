import Project from '../../models/project.model.js';
import { createProjectDtoInSchema } from '../../validations/projectValidation/createProjectValidation.js';

const createProject = async (req, res) => {
    try {

        const { error, value } = createProjectDtoInSchema.validate(req.body, { abortEarly: false });

        if (error) {

            return res.status(400).json({
                message: "Validation errors.",
                errors: error.details.map(err => err.message),
            });
        }


        if (!res.locals.user) {
            return res.status(401).json({ message: 'Unauthorized. User not found.' });
        }


        const { title, description, goalAmount, deadline, category, images } = value;

        const newProject = new Project({
            creatorId: res.locals.user._id,
            title,
            description,
            goalAmount,
            category,
            created_at: new Date(),
            deadline,
            images: images || []
        });

        const savedProject = await newProject.save();

        res.status(201).json({
            message: "Project created successfully",
            project: savedProject,
        });
    } catch (error) {
        console.error("Error in createProject:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export default createProject;
