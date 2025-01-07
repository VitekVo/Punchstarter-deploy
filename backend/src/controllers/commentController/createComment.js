import Comment from '../../models/comment.model.js';
import Project from '../../models/project.model.js';
import logger from '../../services/logger.js'; // Importování loggeru

const createComment = async (req, res) => {
  try {
    const { text, projectId, userId } = req.body;


    logger.info('Received request to create comment', { text, projectId, userId });


    if (!text || !projectId || !userId) {
      logger.warn('Missing required fields: text, projectId, or userId');
      return res.status(400).json({ message: "Text, Project ID, and User ID are required." });
    }


    const project = await Project.findById(projectId);
    if (!project) {
      logger.warn(`Project with ID ${projectId} not found`);
      return res.status(404).json({ message: "Project not found." });
    }


    const comment = new Comment({
      comment: text,
      project_id: projectId,
      user_id: userId,
    });
    await comment.save();


    logger.info(`Comment created successfully for project ${projectId} by user ${userId}`, { commentId: comment._id });

    res.status(201).json({
      message: "Comment created and added to project successfully.",
      comment,
    });
  } catch (error) {

    logger.error('Error in createComment:', { message: error.message, stack: error.stack });
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export default createComment;
