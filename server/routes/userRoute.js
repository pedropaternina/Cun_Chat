const express = require("express");
const router = express.Router()
const {registerUser, getAllUsers, getUserById, loginUser} = require("../controllers/userController")

router.post("/register", registerUser);
router.get("/", getAllUsers);
router.get("/getById/:userId", getUserById);
router.post("/login", loginUser);

module.exports = router