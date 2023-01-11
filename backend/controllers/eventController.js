const Event = require("../models/eventModel");
const path = require("path");

// @desc    Fetch Timed Events
// @route   GET /api/events/allevents
// access   Private
const getAllEvents = (req, res) => {
  Event.find({ user: req.user._id })
    .then((result) => {
      const events = result.filter((event) => event.allDay === false);
      res.json(events);
    })
    .catch((err) => {
      console.log(err);
    });
};

// @desc    Fetch AllDay Events
// @route   GET /api/events/allDayEvents
// access   Private
const getAllDayEvents = (req, res) => {
  Event.find({ user: req.user._id })
    .then((result) => {
      const allday = result.filter((event) => event.allDay === true);
      res.json(allday);
    })
    .catch((err) => {
      console.log(err);
    });
};

// @desc    Fetch Single Event
// @route   GET /api/events/getEvent/:id
// access   Private
const getEventById = (req, res) => {
  const id = req.params.id;
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
  const id = req.params.id;
  const { startTime, endTime, name, location } = req.body;

  Event.findByIdAndUpdate({ _id: id }, { startTime, endTime, name, location })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log("Updatation Error ", err);
    });
};

// @desc    Delete Event
// @route   DELETE /api/events/delete/:id
// access   Private
const deleteEvent = (req, res) => {
  const id = req.params.id;
  Event.findByIdAndDelete(id)
    .then(() => {
      res.json({ redirect: "/events" });
    })
    .catch((err) => {
      console.log("Deletion Error => ", err);
    });
};

// @desc    Create Timed Event
// @route   POST /api/events
// access   Private
const createEvent = (req, res) => {
  const { startTime, endTime, name, location } = req.body;
  const event = new Event({
    startTime,
    endTime,
    name,
    location,
    allDay: false,
    user: req.user._id,
  });

  event
    .save()
    .then(() => {
      res.status(201).json(event);
    })
    .catch((err) => {
      console.log(err);
    });
};

// @desc    Create AllDay Event
// @route   POST /api/events/createAllDay
// access   Private
const createAllDayEvent = (req, res) => {
  const { name, location } = req.body;

  console.log("All Day ", name, location);

  const event = new Event({
    startTime: Date.now(),
    endTime: Date.now(),
    name,
    location,
    allDay: true,
    user: req.user._id,
  });
  event
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  createAllDayEvent,
  getAllDayEvents,
};
