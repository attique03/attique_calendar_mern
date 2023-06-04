const Event = require("../models/eventModel");
const path = require("path");

// @desc    Fetch Timed Events
// @route   GET /api/events/allevents
// access   Private
const getEvents = (req, res) => {
  const { allDay } = req.query;

  Event.find({ user: req.user._id })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};

// @desc    Fetch Single Event
// @route   GET /api/events/getEvent/:id
// access   Private
const getEventById = (req, res) => {
  const { id } = req.params;
  Event.findById({ _id: id })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
};

// @desc    Update Event
// @route   PUT /api/events/update/:id
// access   Private
const updateEvent = (req, res) => {
  const { id } = req.params;
  const { startTime, endTime, name, location } = req.body;

  Event.findByIdAndUpdate({ _id: id }, { startTime, endTime, name, location })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};

// @desc    Delete Event
// @route   DELETE /api/events/delete/:id
// access   Private
const deleteEvent = (req, res) => {
  const { id } = req.params;
  Event.findByIdAndDelete(id)
    .then(() => {
      res.json({ success: "Event Deleted" });
    })
    .catch((err) => {
      res.json(err);
    });
};

// @desc    Create Timed Event
// @route   POST /api/events
// access   Private
const createEvent = (req, res) => {
  const { startTime, endTime, name, location, allDay } = req.body;
  const event = new Event({
    startTime: !allDay ? startTime : Date.now(),
    endTime: !allDay ? endTime : Date.now(),
    name,
    location,
    allDay,
    user: req.user._id,
  });

  event
    .save()
    .then(() => {
      res.status(201).json(event);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports = {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
