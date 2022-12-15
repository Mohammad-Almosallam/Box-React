
const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required:true,
    },
    number:{
      type: Number,
      required:true,
    },
    CVV: {
      type: Number,
      required:true,
    },
    type:{
      type: String,
      required:true,
    },
    expirationM:{
      type: Number,
      required:true,
    },
    expirationY:{
      type: Number,
      required:true,
    }

  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("Payment", paymentSchema);


