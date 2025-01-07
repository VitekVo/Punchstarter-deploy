import { createUserDtoInSchema, createUserDtoOutSchema } from '../../validations/userValidation/createUserValidation.js';
import User from '../../models/user.model.js';
import { createToken, maxAge } from '../../services/authService.js';
import logger from "../../services/logger.js";

const createUser = async (req, res) => {
    try {
        // Validace vstupních dat
        const { error, value } = createUserDtoInSchema.validate(req.body);
        if (error) {
            logger.warn('Invalid user input', { errors: error.details });
            return res.status(400).json({ message: 'Invalid input', details: error.details });
        }

        logger.info('User input validation passed', { username: value.username });

        const isProd = process.env.NODE_ENV === 'production';

        // Vytvoření nového uživatele
        const newUser = new User({
            username: value.username,
            passwordHash: value.password,
            createdAt: new Date(Date.now()).toISOString(),
            followingProjects: [],
            contributions: []
        });

        await newUser.save();

        // Vytvoření tokenu
        const token = createToken(newUser.userId);

        // Nastavení cookie s tokenem
        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: maxAge * 1000,
            sameSite: isProd ? "none" : "lax",
            secure: isProd
        });

        logger.info('User created successfully', { userId: newUser.userId, username: newUser.username });

        // Odeslání odpovědi
        res.status(201).json({ message: 'User created', user: newUser });
    } catch (error) {
        logger.error('Error in createUser:', { message: error.message, stack: error.stack });
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export default createUser;
