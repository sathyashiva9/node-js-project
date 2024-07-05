const express = require("express");
const router = express.Router();
const { signupGet,signupPost,loginGet,loginPost,logoutGet } = require("../controllers/authController");

router.get("/signup", signupGet);
router.post("/signup", signupPost);

router.get("/login", loginGet);
router.post("/login", loginPost);

router.get("/logout", logoutGet);
module.exports = router;