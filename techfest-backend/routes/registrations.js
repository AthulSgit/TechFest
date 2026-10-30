
const express = require("express");
const { body, validationResult } = require("express-validator");

const Registration = require("../models/Registration");
const Event = require("../models/Event");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// Register for an event
router.post(
  "/",
  authMiddleware,
  [
    body("eventId")
      .trim()
      .isMongoId()
      .withMessage("Invalid event ID")
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array()
        });
      }

      const { eventId } = req.body;

      const event = await Event.findById(eventId);

      if (!event) {
        return res.status(404).json({
          message: "Event not found"
        });
      }

      if (event.seats <= 0) {
        return res.status(400).json({
          message: "No seats available"
        });
      }

      const existingRegistration = await Registration.findOne({
        user: req.user.userId,
        event: eventId
      });

      if (existingRegistration) {
        return res.status(409).json({
          message: "Already registered for this event"
        });
      }

      const registration = new Registration({
        user: req.user.userId,
        event: eventId
      });

      await registration.save();

      event.seats -= 1;
      await event.save();

      return res.status(201).json({
        message: "Event registration successful",
        registration
      });

    } catch (error) {
      console.error("Event registration error:", error);

      return res.status(500).json({
        message: "Registration failed"
      });
    }
  }
);

// View logged-in user's registrations
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const registrations = await Registration.find({
      user: req.user.userId
    }).populate("event");

    return res.status(200).json(registrations);

  } catch (error) {
    console.error("Fetch registrations error:", error);

    return res.status(500).json({
      message: "Failed to fetch registrations"
    });
  }
});

module.exports = router;
