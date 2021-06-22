const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const projectSchema = new Schema({
    title: {
      type: String
    },

    body: {
      type: String
    },

    year: {
      type: Number
    },

    summary: {
      type: String
    },

    role: {
      type: String
    },

    referrerUrl: {
      type: String,
      trim: true
    },

    thumbnailUrl: {
      type: String,
      trim: true
    },

    imageTwoUrl: {
      type: String,
      trim: true
    },

    imageThreeUrl: {
      type: String,
      trim: true
    },

    videoUrl: {
      type: String,
      trim: true
    }
});

const Project = mongoose.model("Project", projectSchema);

module.exports = { Project };