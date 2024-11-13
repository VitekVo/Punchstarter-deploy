import { createUserDtoInSchema, createUserDtoOutSchema, getUserByIdDtoInSchema, getUserByIdDtoOutSchema, updateUserDtoInSchema, updateUserDtoOutSchema,
    DeleteUserDtoInSchema, DeleteUserDtoOutSchema, followProjectDtoInSchema, followProjectDtoOutSchema
 } from '../validations/userValidations.js';

 import {createToken, maxAge} from '../services/authService.js'
 import User from '../models/user.model.js'

// Mock data for testing
const mockUsers = [
    { userId: '1', username: 'First', email: 'first@example.com', createdAt: new Date(Date.now()).toISOString() , followingProjects: [], contributions: [] },
    { userId: '2', username: 'Second', email: 'second@example.com', createdAt: new Date(Date.now()).toISOString(), followingProjects: [], contributions: [] }
];

const loginUser = async (req, res) => {
    const { username, password } = req.body;
    const isProd = process.env.NODE_ENV === "production";
  
    try {
      const user = await User.login(username, password);
      const token = createToken(user._id);
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: maxAge * 1000,
        sameSite: isProd ? "none" : "lax",
        secure: isProd,
      });
  
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json({ message: "Invalid data", errors: err });
    }
  };

// Create a new user
const createUser = async (req, res) => {
    // const { error } = createUserDtoInSchema.validate(req.body);
    const isProd = process.env.NODE_ENV === 'production'

        const newUser = new User({ 
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            createdAt:  new Date(Date.now()).toISOString(),
            followingProjects: [],
            contributions: []
        })

        await newUser.save()

        const token = createToken(newUser.userId)

        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: maxAge * 1000,
            sameSite: isProd ? "none" : "lax",
            secure: isProd
        })
        
        res.status(201).json({ message: 'User created', user: newUser });
};

// Get user by ID
const getUserById = (req, res) => {
    const { error: inputError, value: validatedQuery } = getUserByIdDtoInSchema.validate(req.query);
    if (inputError) {
        return res.status(400).json({ message: 'Invalid input', details: inputError.details });
    }

    const user = mockUsers.find(user => user.userId === validatedQuery.userId);
    if (user) {

        const { error: outputError } = getUserByIdDtoOutSchema.validate(user);
        if (outputError) {
            return res.status(500).json({ message: 'Data format error', details: outputError.details });
        }
        
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

// Update user
const updateUser = (req, res) => {
    const { error: inputError, value: validatedBody } = updateUserDtoInSchema.validate(req.body);
    if (inputError) {
        return res.status(400).json({ message: 'Invalid input', details: inputError.details });
    }

    // Hledání uživatele podle ID
    const user = mockUsers.find(user => user.userId === req.query.userId);
    if (user) {
        // Aktualizace dat uživatele
        Object.assign(user, validatedBody);
        user.updatedAt = new Date().toISOString();

        // Validace výstupních dat
        const { error: outputError, value: validatedUser } = updateUserDtoOutSchema.validate({
            userId: user.userId,
            username: user.username,
            email: user.email,
            passwordHash: user.passwordHash,
            followingProjects: user.followingProjects,
            contributions: user.contributions,
            updatedAt: user.updatedAt
        });

        if (outputError) {
            return res.status(500).json({ message: 'Data format error', details: outputError.details });
        }

        res.json({ message: 'User updated', user: validatedUser });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

const deleteUser = async (req, res) => {
    // Validace vstupních dat pomocí DeleteUserDtoInSchema
    const { error } = DeleteUserDtoInSchema.validate(req.query);
    if (error) {
        return res.status(400).json({ message: 'Invalid request data', error: error.details });
    }

    const { userId } = req.query;
    const userIndex = mockUsers.findIndex(user => user.userId === userId);
    if (userIndex !== -1) {
        // Smazání uživatele
        mockUsers.splice(userIndex, 1);
        const deletedAt = new Date().toISOString();

        // Vytvoření odpovědi
        const response = {
            message: 'User deleted',
            deletedAt
        };

        // Validace výstupu pomocí DeleteUserDtoOutSchema
        const { error: outputError } = DeleteUserDtoOutSchema.validate(response);
        if (outputError) {
            return res.status(500).json({ message: 'Error in response data', error: outputError.details });
        }

        // Vrácení odpovědi
        res.status(200).json(response);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};


const followProject = (req, res) => {
 
    // dodelat kontrolu pro projektId lol
    const { error } = followProjectDtoInSchema.validate(req.query);
    if (error) {
        return res.status(400).json({ message: 'Invalid request data', error: error.details });
    }

    const { userId, projectId } = req.query;
    const user = mockUsers.find(user => user.userId === userId);

    if (user) {

        user.followingProjects.push(projectId);
        const followedAt = new Date().toISOString();


        const response = {
            message: `User is now following the project`,
            followedAt
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

export { createUser, getUserById, updateUser, deleteUser, followProject, loginUser };
