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

const { authUser } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/createAllDay", authUser, createAllDayEvent);
router.get("/allevents", authUser, getAllEvents);
router.get("/allDayEvents", authUser, getAllDayEvents);
router.delete("/delete/:id", authUser, deleteEvent);
router.put("/update/:id", authUser, updateEvent);
router.get("/getEvent/:id", authUser, getEventById);
router.post("/", authUser, createEvent);

module.exports = router;
