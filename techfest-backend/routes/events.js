const express = require("express");
const Event = require("../models/Event");
const authMiddleware = require("../middleware/auth");
const router = express.Router();


// GET all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch events" });
  }
});

// GET event by ID
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch event" });
  }
});

// POST - add event
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, category, fee, seats, date } = req.body;

    const event = new Event({
      name,
      category,
      fee,
      seats,
      date
    });

    const savedEvent = await event.save();

    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create event",
      error: error.message
    });
  }
});

// PUT - update event
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!event) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update event",
      error: error.message
    });
  }
});

// DELETE - remove event
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    res.status(200).json({
      message: "Event deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete event"
    });
  }
});

module.exports = router;