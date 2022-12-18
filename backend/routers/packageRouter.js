const express = require("express");
const router = express.Router();
const {
  getPackages,
  createPackage,
  deletePackage,
  updatePackage,
  getAllPackages,
} = require("../controllers/packageController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getPackages).post(protect, createPackage);
router.route("/:id").delete(deletePackage).put(protect, updatePackage);
router.get("/allPackages", getAllPackages);

module.exports = router;
