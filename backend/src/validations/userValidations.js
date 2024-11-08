import Joi from 'joi';

// dtoIn, dtoOut schema for creating a user
export const createUserDtoInSchema = Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});
export const createUserDtoOutSchema = Joi.object({
    userId: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    createdAt: Joi.date().iso().required()
});

// dtoIn,dtoOut schema for getting user by id
export const getUserByIdDtoInSchema = Joi.object({
    userId: Joi.string().required()
  });
export const getUserByIdDtoOutSchema = Joi.object({
    userId: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    createdAt: Joi.date().iso().required(),
    followingProjects: Joi.array().required(),
    contributions: Joi.array().required()
  });

// dtoIn, dtoOut schema for update of user data
export const updateUserDtoInSchema = Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    passwordHash: Joi.string().optional(),
    followingProjects: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)).optional(),
    contributions: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)).optional(),
  });
 export const updateUserDtoOutSchema = Joi.object({
    userId: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    passwordHash: Joi.string().optional(),
    followingProjects: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)).optional(),
    contributions: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)).optional(),
    updatedAt: Joi.date().iso().required()
  });

  // dtoIn, dtoOut schema for deleting user
  export const DeleteUserDtoInSchema = Joi.object({
    userId: Joi.string().required()
  });
  export const DeleteUserDtoOutSchema = Joi.object({
    message: Joi.string().valid('User deleted').required(),
    deletedAt: Joi.string().isoDate().required(), // Validace pro ISO formát data
  });

  // dtoIn,dtoOut schema for follow project
export const followProjectDtoInSchema = Joi.object({
  userId: Joi.string().required(),
  projectId: Joi.string().required() 
});

export const followProjectDtoOutSchema = Joi.object({
  message: Joi.string().valid('User is now following the project').required(),
  followedAt: Joi.string().isoDate().required()
});