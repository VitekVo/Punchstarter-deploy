import express from "express";
import passport from "passport";
import logger from "../services/logger.js"; // import logger

const router = express.Router();

// Spuštění přihlášení přes Google
router.get(
    "/google",
    (req, res, next) => {
        logger.info("Google login initiated", { userIp: req.ip });
        next();
    },
    passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback po úspěšném přihlášení
router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/",
    }),
    (req, res) => {
        logger.info("Google login successful", { userId: req.user._id, userName: req.user.username });
        // Přesměruj uživatele po přihlášení
        res.redirect("/dashboard");
    }
);

// Odhlášení uživatele
router.get("/logout", (req, res, next) => {
    logger.info("User logout initiated", { userId: req.user?._id, userName: req.user?.username });

    req.logout(err => {
        if (err) {
            logger.error("Error during logout", { errorMessage: err.message });
            return next(err);
        }
        logger.info("User logged out successfully", { userId: req.user?._id });
        res.redirect("/");
    });
});

export default router;
