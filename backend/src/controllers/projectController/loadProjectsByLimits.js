import Project from "../../models/project.model.js";
import loadProjectsDtoInQuerySchema from "../../validations/projectValidation/loadProjectsByLimitValidation.js";
import logger from "../../services/logger.js";

const loadProjectsByLimit = async (req, res) => {
  try {
    const { error, value } = loadProjectsDtoInQuerySchema.validate(req.query, {
      abortEarly: false,
    });

    if (error) {
      logger.warn('Validation errors in loadProjectsByLimit', { errors: error.details.map((err) => err.message) });
      return res.status(400).json({
        message: "Validation errors.",
        errors: error.details.map((err) => err.message),
      });
    }

    logger.info('Validation passed for loadProjectsByLimit', { limit: value.limit });

    const { limit } = value;

    const projects = await Project.find()
        .limit(limit)
        .populate("creatorId", "username")
        .populate({
          path: "comments",
          populate: {
            path: "user_id",
            select: "username",
          },
        })
        .exec();

    if (!projects || projects.length === 0) {
      logger.warn('No projects found for the given limit', { limit });
      return res.status(404).json({ message: "No projects found." });
    }

    logger.info(`${projects.length} project(s) found`, { limit });

    res.status(200).json({
      message: `${projects.length} project(s) found.`,
      projects,
    });
  } catch (error) {
    logger.error("Error in loadProjectsByLimit:", { message: error.message, stack: error.stack });
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export default loadProjectsByLimit;
