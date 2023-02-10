const express = require("express");
const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  createAllDayEvent,
  getAllDayEvents,
} = require("../controllers/eventController");

const router = express.Router();

router.post("/createAllDay", createAllDayEvent);
router.post("/", createEvent);
router.get("/allevents", getAllEvents);
router.get("/allDayEvents", getAllDayEvents);
router.route("/:id").get(getEventById).put(updateEvent).delete(deleteEvent);

module.exports = router;
