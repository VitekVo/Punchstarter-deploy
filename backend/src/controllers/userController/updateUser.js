import { updateUserDtoInSchema, updateUserDtoOutSchema } from '../../validations/userValidation/updateUserValidation.js';
import User from '../../models/user.model.js';
import logger from '../../services/logger.js';

const updateUser = async (req, res) => {
    const { error, value } = updateUserDtoInSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: 'Invalid input', details: error.details });
    }

    try {
        const user = await User.findById(req.query.userId);
        if (user) {
            if (value.password) {
                value.passwordHash = value.password;
                delete value.password;
            }

            Object.assign(user, value);
            user.updatedAt = new Date().toISOString();

            await user.save();

            const { error: outputError, value: validatedUser } = updateUserDtoOutSchema.validate(user);
            if (outputError) {
                return res.status(500).json({ message: 'Data format error', details: outputError.details });
            }

            logger.info("User updated successfully", { userId: user._id });
            res.json({ message: 'User updated', user: validatedUser });
        } else {
            logger.warn("User not found", { userId: req.query.userId });
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        logger.error("Error updating user", { userId: req.query.userId, errorMessage: error.message, stack: error.stack });
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export default updateUser;
