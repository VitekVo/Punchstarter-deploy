import Project from '../../models/project.model.js';
import  { updateProjectDtoInSchema  } from "../../validations/projectValidation/updateProjectValidation.js";
import { ProjectIdFromQuerySchema } from "../../validations/projectValidation/projectValidation.js";
const updateProject = async (req, res) => {
    try {
        const { projectId } = req.query;
        const updates = req.body;


        const { projectIdError, projectIdErrorValue } = ProjectIdFromQuerySchema.validate(updates, { abortEarly: false });


        if (projectIdError) {
            return res.status(400).json({
                message: "Project ID is invalid.",
                errors: projectIdErrorValue.details.map(err => err.message)
            });
        }


        const { error, value } = updateProjectDtoInSchema.validate(updates, { abortEarly: false });

        if (error) {
            return res.status(400).json({
                message: "Validation errors.",
                errors: error.details.map(err => err.message)
            });
        }


        const updatedProject = await Project.findByIdAndUpdate(projectId, value, {
            new: true,
            runValidators: true,
        });

        if (!updatedProject) {
            return res.status(404).json({ message: "Project not found." });
        }

        res.status(200).json({
            message: "Project updated successfully",
            project: updatedProject,
        });
    } catch (error) {
        console.error("Error in updateProject:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export default updateProject;
