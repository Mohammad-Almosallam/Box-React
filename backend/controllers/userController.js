const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, address, password } = req.body;

  //Checking inputs are all entered
  if (!name || !email || !password || !address) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  /* This is checking if the user already exists in the database. */
  const userExits = await User.findOne({ email });

  if (userExits) {
    res.status(400);
    throw new Error("User already exists");
  }

  /* Creating a new user and hashing the password. */
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name: name,
    email: email,
    address: address,
    password: hashedPassword,
  });

  /* Checking if the user has been created and if it has it will return the user data. */
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      address: user.address,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //Get user emil to check password
  const user = await User.findOne({ email });

  /* This is checking if the user exists and if the password is correct. If it is correct it will return
the user data. If it is not correct it will throw an error. */
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      address: user.address,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

//Generate JWT (Token)
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
};
