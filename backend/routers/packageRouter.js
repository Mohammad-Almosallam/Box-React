const express = require("express");
const router = express.Router();
const {
  getPackages,
  createPackage,
  deletePackage,
  updatePackage,
} = require("../controllers/packageController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getPackages).post(protect, createPackage);
router.route("/:id").delete(protect, deletePackage).put(protect, updatePackage);

module.exports = router;
