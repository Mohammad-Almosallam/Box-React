const asyncHandler = require("express-async-handler");

const Package = require("../models/packageModel");
const User = require("../models/userModel");

// @desc    Get Package
// @route   GET /api/package
// @access  Private
const getPackages = asyncHandler(async (req, res) => {
  //req.user.id is accesed after autherization thru authMiddleware
  const package = await Package.find({ user: req.user.id });

  res.status(200).json(package);
});

// @desc    create Package
// @route   POST /api/package
// @access  Private
const createPackage = asyncHandler(async (req, res) => {
  const { name, weight, type, recEmail } = req.body;

  if (!name || !weight || !type || !recEmail) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  User.findOne({ email: recEmail }, async function (err, user) {
    if (err) {
      res.status(400);
    } else {
      if (user === null) {
        res.status(400);
        res.json({ message: "User not found or Email is wrong" });
      } else {
        //req.user.id is accesed after autherization thru authMiddleware
        const package = await Package.create({
          user: req.user.id,
          name: req.body.name,
          weight: req.body.weight,
          type: req.body.type,
          recEmail: req.body.recEmail,
        });

        await Package.create({
          user: user._id,
          name: req.body.name,
          weight: req.body.weight,
          type: req.body.type,
          recEmail: user.email,
        });
        res.status(200).json(package);
      }
    }
  });
});

// @desc    update Package
// @route   PUT /api/package/:id
// @access  Private
const updatePackage = asyncHandler(async (req, res) => {
  const package = await Package.findById(req.params.id);

  if (!package) {
    res.status(400);
    throw new Error("Package not found");
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  //Make sure the logged in user matches the package user
  if (package.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedPackage = await Package.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedPackage);
});

// @desc    Delete Package
// @route   GET /api/package/:id
// @access  Private
const deletePackage = asyncHandler(async (req, res) => {
  const package = await Package.findById(req.params.id);

  if (!package) {
    res.status(400);
    throw new Error("Package not found");
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  //Make sure the logged in user matches the package user
  if (package.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await package.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getPackages,
  createPackage,
  updatePackage,
  deletePackage,
};
