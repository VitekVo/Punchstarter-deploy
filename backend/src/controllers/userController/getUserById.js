import {
  getUserByIdDtoInSchema,
  getUserByIdDtoOutSchema,
} from "../../validations/userValidation/getUserByIdValidation.js";
import User from "../../models/user.model.js";

const getUserById = async (req, res) => {
  const { error, value } = getUserByIdDtoInSchema.validate(req.params);

  if (error) {
    return res
      .status(400)
      .json({ message: "Invalid input", details: error.details });
  }

  const user = await User.findById(value.userId);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

export default getUserById;
