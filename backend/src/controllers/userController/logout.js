const logout = async (req, res) => {
  // Clear the JWT cookie
  res.clearCookie("jwt", {
    httpOnly: true, // Prevents access by JavaScript
    secure: true, // Ensures the cookie is only sent over HTTPS
    sameSite: "strict", // Helps prevent CSRF attacks
  });

  res.status(200).json({ message: "Logged out successfully" });
};

export default logout;
