const express = require("express");
const router = express.Router();
const { registerCard } = require("../controllers/paymentController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect,registerCard);

module.exports = router;
