import Project from '../../models/project.model.js';
import { updateProjectDtoInSchema } from "../../validations/projectValidation/updateProjectValidation.js";
import { ProjectIdFromQuerySchema } from "../../validations/projectValidation/projectValidation.js";
import { uploadImages } from "../../services/uploadService.js";

const updateProject = async (req, res) => {
    try {
        // Získání ID projektu z query
        const { projectId } = req.params;

        // Validace ID projektu
        const { error: projectIdError, value: projectIdValue } = ProjectIdFromQuerySchema.validate({ projectId });
        if (projectIdError) {
            return res.status(400).json({
                message: "Invalid Project ID.",
                errors: projectIdError.details.map(err => err.message),
            });
        }

        // Validace aktualizovaných dat (req.body)
        const { error, value } = updateProjectDtoInSchema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                message: "Validation errors.",
                errors: error.details.map(err => err.message),
            });
        }

        // Zpracování nových obrázků (req.files)
        const newImages = req.files?.map(file => file.buffer) || [];

        // Najít projekt v databázi
        const project = await Project.findById(projectIdValue.projectId);
        if (!project) {
            return res.status(404).json({ message: "Project not found." });
        }

        // Pokud jsou nahrány nové obrázky, přepsat je, jinak zachovat stávající
        if (newImages.length > 0) {
            value.images = newImages; // Přepsání stávajících obrázků
        } else {
            value.images = project.images; // Zachování stávajících obrázků
        }

        // Aktualizace projektu
        const updatedProject = await Project.findByIdAndUpdate(projectIdValue.projectId, value, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            message: "Project updated successfully",
            project: updatedProject,
        });
    } catch (error) {
        console.error("Error in updateProject:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const updateProjectHandler = [uploadImages, updateProject];
