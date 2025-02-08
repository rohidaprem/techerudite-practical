const express = require("express");
const { signUp, verifyAuth, signIn } = require("../modules/auth")
const router = express.Router();


// Correct the route handler to include the `req` and `res` parameters
router.get("/list", (req, res) => {
    res.send("List fetched successfully");
});
router.post("/auth/sign-up", signUp);
router.post("/auth/sign-in", signIn);
router.post("/auth/verify/:token", verifyAuth);

module.exports = router;
