import { followProjectDtoInSchema, followProjectDtoOutSchema } from '../../validations/userValidation/followProjectValidation.js';
import User from '../../models/user.model.js';
import Project from '../../models/project.model.js';
import logger from "../../services/logger.js";

const followProject = async (req, res) => {

    const { userId, projectId } = req.params;

    try {

        // Najít uživatele
        const user = await User.findById(userId);
        if (!user) {
            logger.warn('User not found', { userId });
            return res.status(404).json({ message: 'User not found' });
        }

        // Najít projekt
        const project = await Project.findById(projectId);
        if (!project) {
            logger.warn('Project not found', { projectId });
            return res.status(404).json({ message: 'Project not found' });
        }

        // Pokud uživatel projekt ještě nesleduje, přidejte ho do seznamu sledovaných
        if (!project.followList.includes(userId)) {
            project.followList.push(userId);

            await project.save();

            logger.info('User started following project', { userId, projectId });
        }

        // Odpověď
        const response = {
            message: `User is now following the project`,
            followedAt: user.updatedAt
        };

        logger.info('Follow action completed', { userId, projectId });

        res.status(200).json(response);
    } catch (err) {
        logger.error('Error in followProject:', { message: err.message, stack: err.stack });
        res.status(500).json({ message: 'Internal server error' });
    }
};

export default followProject;
