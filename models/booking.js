const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  title: String,
  name: String,
  surname: String,
  phone: String,
  start: String,
  end: String,
});

module.exports = mongoose.model("Booking", bookingSchema);
