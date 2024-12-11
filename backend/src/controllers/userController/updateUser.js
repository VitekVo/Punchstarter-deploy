import { updateUserDtoInSchema, updateUserDtoOutSchema } from '../../validations/userValidation/updateUserValidation.js';
import User from '../../models/user.model.js';

const updateUser = async (req, res) => {
    const { error, value } = updateUserDtoInSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: 'Invalid input', details: error.details });
    }

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

        res.json({ message: 'User updated', user: validatedUser });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

export default updateUser;
