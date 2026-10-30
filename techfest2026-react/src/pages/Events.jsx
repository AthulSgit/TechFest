import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { apiFetch } from "../api";
import { useAuth } from "../context/AuthContext";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const { user } = useAuth();
  const navigate = useNavigate();

  async function loadEvents() {
    try {
      const response = await apiFetch("/api/events");

      if (!response.ok) {
        throw new Error("Failed to load events");
      }

      const data = await response.json();
      setEvents(data);
      setError("");
    } catch (error) {
      setError("Could not load events");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEvents();
  }, []);

  async function registerForEvent(eventId) {
    if (!user) {
      navigate("/login");
      return;
    }

    setMessage("");

    try {
      const response = await apiFetch("/api/registrations", {
        method: "POST",
        body: JSON.stringify({ eventId })
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Registration failed");
        return;
      }

      setMessage(data.message);
      await loadEvents();
    } catch (error) {
      setMessage("Could not connect to server");
    }
  }

  if (loading) {
    return <p>Loading events...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="page">
      <h1>TechFest 2026 Events</h1>

      {message && <p className="error-msg">{message}</p>}

      <div className="event-grid">
        {events.map((event) => (
          <div className="event-card" key={event._id}>
            <h2>{event.name}</h2>

            <p>Category: {event.category}</p>
            <p>Fee: ₹{event.fee}</p>
            <p>Seats Available: {event.seats}</p>

            <p>
              Date: {new Date(event.date).toLocaleDateString()}
            </p>

            <button
              onClick={() => registerForEvent(event._id)}
              disabled={event.seats <= 0}
            >
              {event.seats > 0 ? "Register for Event" : "Sold Out"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Events;