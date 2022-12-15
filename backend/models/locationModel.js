const mongoose = require("mongoose");

const locationSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    stage:{
      type: Number,
    }

  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("Location", locationSchema);


