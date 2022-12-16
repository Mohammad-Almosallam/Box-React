const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  updateUser,
  getUser,
  getAllUsers,
} = require("../controllers/userController");

router.route("/").post(registerUser).get(getAllUsers);
router.post("/login", loginUser);
router.route("/:id").put(updateUser).get(getUser);

module.exports = router;
