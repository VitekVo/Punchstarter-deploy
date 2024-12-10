import User from "../../models/user.model.js";

export const getCurrentUser = async (req, res) => {
  try {
    console.log(res.locals.user?.id);

    const user = await User.findById(res.locals.user?.id);
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Failed to fetch user" });
  }
};
