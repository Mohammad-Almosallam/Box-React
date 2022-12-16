const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  updateUser,
  getUser,
} = require("../controllers/userController");

router.post("/", registerUser);
router.post("/login", loginUser);
router.route("/:id").put(updateUser).get(getUser);

module.exports = router;
