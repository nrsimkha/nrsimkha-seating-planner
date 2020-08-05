const express = require('express');
const app = express.Router();
const bookingsRouter = require('./bookings');


app.use('/bookings', bookingsRouter);



module.exports = app;