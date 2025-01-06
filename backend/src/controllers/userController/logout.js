import logger from '../../services/logger.js';

const logout = async (req, res) => {
  try {
    // Clear the JWT cookie
    res.clearCookie("jwt", {
      httpOnly: true, // Prevents access by JavaScript
      secure: true, // Ensures the cookie is only sent over HTTPS
      sameSite: "strict", // Helps prevent CSRF attacks
    });

    logger.info("User logged out successfully", { userId: req.user?.id });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    logger.error("Error logging out", { errorMessage: error.message, stack: error.stack });
    res.status(500).json({ message: "Error during logout", error: error.message });
  }
};

export default logout;
