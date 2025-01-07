import Project from "../../models/project.model.js";
import { createProjectDtoInSchema } from "../../validations/projectValidation/createProjectValidation.js";
import { uploadImages } from "../../services/uploadService.js";
import logger from "../../services/logger.js";

const createNewProject = async (req, res) => {
  try {
    const { error, value } = createProjectDtoInSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      logger.warn('Validation errors in createProject', { errors: error.details.map((err) => err.message) });
      return res.status(400).json({
        message: "Validation errors.",
        errors: error.details.map((err) => err.message),
      });
    }

    if (!res.locals.user) {
      logger.warn('Unauthorized access attempt in createProject');
      return res.status(401).json({ message: "Unauthorized. User not found." });
    }

    const { title, description, goalAmount, deadline, category } = value;

    const images = req.files?.map((file) => file.buffer) || [];

    const newProject = new Project({
      creatorId: res.locals.user._id,
      title,
      description,
      goalAmount,
      category,
      created_at: new Date(),
      deadline,
      images: images || [],
    });

    const savedProject = await newProject.save();

    logger.info('Project created successfully', { projectId: savedProject._id, creatorId: res.locals.user._id });

    res.status(201).json({
      message: "Project created successfully",
      project: savedProject,
    });
  } catch (error) {
    logger.error("Error in createProject:", { message: error.message, stack: error.stack });
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const createProject = [uploadImages, createNewProject];
