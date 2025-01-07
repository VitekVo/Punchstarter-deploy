import {
  getUserByIdDtoInSchema,
  getUserByIdDtoOutSchema,
} from "../../validations/userValidation/getUserByIdValidation.js";
import User from "../../models/user.model.js";
import logger from "../../services/logger.js";

const getUserById = async (req, res) => {
  const { error, value } = getUserByIdDtoInSchema.validate(req.params);

  if (error) {
    logger.warn("Invalid input in getUserById", { errorDetails: error.details });
    return res
        .status(400)
        .json({ message: "Invalid input", details: error.details });
  }

  try {
    const user = await User.findById(value.userId);

    if (user) {
      logger.info("User fetched successfully", { userId: value.userId });
      res.json(user);
    } else {
      logger.warn("User not found", { userId: value.userId });
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    logger.error("Error fetching user", { message: error.message, stack: error.stack });
    res.status(500).json({ message: "Server error" });
  }
};

export default getUserById;
