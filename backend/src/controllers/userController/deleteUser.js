import { DeleteUserDtoInSchema, DeleteUserDtoOutSchema } from '../../validations/userValidation/deleteUserValidation.js';
import User from '../../models/user.model.js';

const deleteUser = async (req, res) => {
    const { error } = DeleteUserDtoInSchema.validate(req.query);
    if (error) {
        return res.status(400).json({ message: 'Invalid request data', error: error.details });
    }

    const { userId } = req.query;
    const user = await User.findByIdAndDelete(userId);

    if (user) {
        const deletedAt = new Date().toISOString();

        const response = {
            message: 'User deleted',
            deletedAt
        };

        const { error: outputError } = DeleteUserDtoOutSchema.validate(response);
        if (outputError) {
            return res.status(500).json({ message: 'Error in response data', error: outputError.details });
        }

        res.status(200).json(response);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

export default deleteUser;
