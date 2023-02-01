const mongoose = require("mongoose");
const { Schema } = mongoose;

const houseSchema = new Schema({
  id: { type: String },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  image2: {
    type: String,
  },
  image3: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  houseSeller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  houseBuyerAppointment: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("House", houseSchema);
