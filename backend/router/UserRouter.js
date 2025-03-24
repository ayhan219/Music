const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../middleware/auth")
const {signup,login,getUser,logout,authGoogle,googleCallback} = require("../controller/UserController")


router.post("/signup",signup);
router.post("/login",login)
router.get("/getuser",AuthMiddleware,getUser)
router.delete("/logout",logout)
router.get('/google', authGoogle);
router.get("/google/callback",googleCallback)

module.exports = router;