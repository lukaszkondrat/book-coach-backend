const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Booking = require("../models/booking");

router.get("/", async (req, res, next) => {
  try {
    const allBookings = await Booking.find();
    res.status(200).json({
      allBookings,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { title, name, surname, phone, start, end } = req.body;
    const booking = new Booking({
      _id: new mongoose.Types.ObjectId(),
      title,
      name,
      surname,
      phone,
      start,
      end,
    });
    const newBooking = await booking.save();
    res.status(200).json({
      message: "New booking successfully created",
      newBooking,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    await Booking.findByIdAndRemove({ _id: id });
    res.status(200).json({
      message: "Booking successfully deleted",
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
});

module.exports = router;
