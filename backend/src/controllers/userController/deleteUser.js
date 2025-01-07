import { DeleteUserDtoInSchema, DeleteUserDtoOutSchema } from '../../validations/userValidation/deleteUserValidation.js';
import User from '../../models/user.model.js';
import logger from "../../services/logger.js";

const deleteUser = async (req, res) => {
    try {
        // Validace dat požadavku
        const { error } = DeleteUserDtoInSchema.validate(req.query);
        if (error) {
            logger.warn('Invalid request data', { errors: error.details });
            return res.status(400).json({ message: 'Invalid request data', error: error.details });
        }

        const { userId } = req.query;
        logger.info('Attempting to delete user', { userId });

        // Smazání uživatele
        const user = await User.findByIdAndDelete(userId);

        if (user) {
            const deletedAt = new Date().toISOString();

            const response = {
                message: 'User deleted',
                deletedAt
            };

            // Validace odpovědních dat
            const { error: outputError } = DeleteUserDtoOutSchema.validate(response);
            if (outputError) {
                logger.error('Error in response data', { errors: outputError.details });
                return res.status(500).json({ message: 'Error in response data', error: outputError.details });
            }

            logger.info('User deleted successfully', { userId, deletedAt });

            res.status(200).json(response);
        } else {
            logger.warn('User not found', { userId });
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        logger.error('Error in deleteUser:', { message: error.message, stack: error.stack });
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export default deleteUser;
