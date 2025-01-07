import Project from '../../models/project.model.js';
import { updateProjectDtoInSchema } from "../../validations/projectValidation/updateProjectValidation.js";
import { ProjectIdFromQuerySchema } from "../../validations/projectValidation/projectValidation.js";
import { uploadImages } from "../../services/uploadService.js";
import logger from "../../services/logger.js";

const updateProject = async (req, res) => {
    try {
        // Získání ID projektu z query
        const { projectId } = req.params;

        // Validace ID projektu
        const { error: projectIdError, value: projectIdValue } = ProjectIdFromQuerySchema.validate({ projectId });
        if (projectIdError) {
            logger.warn('Invalid Project ID provided', { projectId });
            return res.status(400).json({
                message: "Invalid Project ID.",
                errors: projectIdError.details.map(err => err.message),
            });
        }

        logger.info('Project ID validation passed', { projectId });

        // Validace aktualizovaných dat (req.body)
        const { error, value } = updateProjectDtoInSchema.validate(req.body, { abortEarly: false });
        if (error) {
            logger.warn('Validation errors in project update', { errors: error.details.map(err => err.message) });
            return res.status(400).json({
                message: "Validation errors.",
                errors: error.details.map(err => err.message),
            });
        }

        logger.info('Update data validation passed', { updates: value });

        // Zpracování nových obrázků (req.files)
        const newImages = req.files?.map(file => file.buffer) || [];

        // Najít projekt v databázi
        const project = await Project.findById(projectIdValue.projectId);
        if (!project) {
            logger.warn('Project not found for update', { projectId });
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

        logger.info('Project updated successfully', { projectId, updatedProject });

        res.status(200).json({
            message: "Project updated successfully",
            project: updatedProject,
        });
    } catch (error) {
        logger.error("Error in updateProject:", { message: error.message, stack: error.stack });
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const updateProjectHandler = [uploadImages, updateProject];
