const mongoose = require("mongoose");

const packageSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please fill name for package"],
    },
    type: {
      type: String,
      required: [true, "Please select type of package"],
    },
    weight: {
      type: Number,
      required: [true, "Please enter weight for package"],
    },
    status: ["Transit", "Delivered", "Lost", "Damaged"],
    flagStatus: {
      type: String,
    },
    recEmail: {
      type: String,
      required: [true, "Please enter the receiver email"],
    },
    details: {
      insuranceAmount: {
        type: Number,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Package", packageSchema);
