import { createUserDtoInSchema, createUserDtoOutSchema } from '../../validations/userValidation/createUserValidation.js';
import User from '../../models/user.model.js';
import { createToken, maxAge } from '../../services/authService.js';

const createUser = async (req, res) => {

    const { error, value } = createUserDtoInSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: 'Invalid input', details: error.details });
    }

    const isProd = process.env.NODE_ENV === 'production';

    const newUser = new User({
        username: value.username,
        passwordHash: value.password,
        createdAt: new Date(Date.now()).toISOString(),
        followingProjects: [],
        contributions: []
    });
    await newUser.save();

    const token = createToken(newUser.userId);

    res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: maxAge * 1000,
        sameSite: isProd ? "none" : "lax",
        secure: isProd
    });


    res.status(201).json({ message: 'User created', user: newUser });
};

export default createUser;
