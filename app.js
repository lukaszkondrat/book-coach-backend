const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const bookingRoutes = require("./routes/bookings");

app.use(express.json());

app.use(cors({ origin: "*" }));

mongoose.connect(
  `mongodb+srv://lukasz:${process.env.MONGO_ATLAS_PASSWORD}@bookingssquash.m3fqxgd.mongodb.net/?retryWrites=true&w=majority`
);

app.use("/bookings", bookingRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
