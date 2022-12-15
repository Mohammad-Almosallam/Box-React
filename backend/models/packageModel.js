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
    status: {
      type:String
    },
    flagStatus: {
      type: String,
    },
    recEmail: {
      type: String,
      required: [true, "Please enter the receiver email"],
    },
    sendEmail: {
      type: String,
      required: [true, "Please enter the sender email"],
    },
    details: {
      insuranceAmount: {
        type: Number,
      },
    },
    locations:{
      type:Array,
    },
    width:{
      type:Number,
      required: [true, "Please enter the width"],
    },
    height:{
      type:Number,
      required: [true, "Please enter the height"],
    },
    cost:{
      type:Number,
    },
    insurance:{
      type:String,
      required: [true, "Please enter Yes or No for insurance"],
    }

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Package", packageSchema);
