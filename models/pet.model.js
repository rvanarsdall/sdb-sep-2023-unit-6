const mongoose = require("mongoose");

const PetSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
  },
});

module.exports = mongoose.model("Pet", PetSchema);
