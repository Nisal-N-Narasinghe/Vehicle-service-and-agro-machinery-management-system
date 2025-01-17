const express = require('express')
const Booking = require('../models/bookingsModel')
const router = express.Router()
const { getBookings, getBooking, createBooking, deleteBooking, updateBooking } = require('../controllers/bookingsController')


//Get all the bookings
router.get('/', getBookings)

//Get single booking
router.get('/:id', getBooking)

//Post a new booking
router.post('/', createBooking)

//Delete a single booking
router.delete('/:id', deleteBooking)

//update booking
router.patch('/:id', updateBooking)


module.exports = router