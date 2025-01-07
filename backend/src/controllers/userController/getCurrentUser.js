import User from "../../models/user.model.js";
import logger from "../../services/logger.js";

export const getCurrentUser = async (req, res) => {
  try {
    logger.info("Fetching current user", { userId: res.locals.user?.id });

    const user = await User.findById(res.locals.user?.id);

    if (!user) {
      logger.warn("User not found", { userId: res.locals.user?.id });
      return res.status(404).json({ message: "User not found" });
    }

    logger.info("User fetched successfully", { userId: res.locals.user?.id });
    res.status(200).json(user);
  } catch (error) {
    logger.error("Error fetching user:", { message: error.message, stack: error.stack });
    res.status(500).json({ message: "Failed to fetch user" });
  }
};
