import { followProjectDtoInSchema, followProjectDtoOutSchema } from '../../validations/userValidation/followProjectValidation.js';
import User from '../../models/user.model.js';
import Project from '../../models/project.model.js';

const followProject = async (req, res) => {


    const { userId, projectId } = req.params;

    try {

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }


        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }


        if (!project.followList.includes(userId)) {
            project.followList.push(userId);


            project.followCount += 1;


            await project.save();
        }


        const response = {
            message: `User is now following the project`,
            followedAt: user.updatedAt
        };

        res.status(200).json(response);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export default followProject;
