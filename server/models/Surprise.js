const mongoose = require("mongoose");

const surpriseSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      default: "surprise",
    },

    occasion: {
      type: String,
      required: true,
    },

    recipient: {
      type: String,
      required: true,
    },

    sender: {
      type: String,
      default: "",
    },

    message: {
      type: String,
      required: true,
    },

    design: {
      type: String,
      default: "romantic",
    },

    template: {
      type: String,
      default: "romantic",
    },

    photos: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Surprise", surpriseSchema);