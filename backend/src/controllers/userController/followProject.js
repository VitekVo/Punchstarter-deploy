import { followProjectDtoInSchema, followProjectDtoOutSchema } from '../../validations/userValidation/followProjectValidation.js';
import User from '../../models/user.model.js';

const followProject = async (req, res) => {
    const { error } = followProjectDtoInSchema.validate(req.params);
    if (error) {
        return res.status(400).json({ message: 'Invalid request data', error: error.details });
    }

    const { userId, projectId } = req.query;
    const user = await User.findById(userId);

    if (user) {
        user.followingProjects.push(projectId);
        user.updatedAt = new Date().toISOString();

        await user.save();

        const response = {
            message: `User is now following the project`,
            followedAt: user.updatedAt
        };

        const { error: outputError } = followProjectDtoOutSchema.validate(response);
        if (outputError) {
            return res.status(500).json({ message: 'Error in response data', error: outputError.details });
        }

        res.status(200).json(response);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

export default followProject;
