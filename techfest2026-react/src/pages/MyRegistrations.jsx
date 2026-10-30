import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { apiFetch } from "../api";
import { useAuth } from "../context/AuthContext";

function MyRegistrations() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!user) {
      setError("Please login first.");
      setLoading(false);
      return;
    }

    async function loadRegistrations() {
      try {
        const response = await apiFetch("/api/registrations/my");

        if (!response.ok) {
          throw new Error("Failed to load registrations");
        }

        const data = await response.json();
        setRegistrations(data);
      } catch (error) {
        setError("Could not load registrations");
      } finally {
        setLoading(false);
      }
    }

    loadRegistrations();
  }, [user, authLoading]);

  if (loading || authLoading) {
    return <p>Loading registrations...</p>;
  }

  if (error) {
    return (
      <div className="page">
        <p className="error-msg">{error}</p>
        {!user && <Link to="/login">Go to Login</Link>}
      </div>
    );
  }

  return (
    <div className="page">
      <h1>My Registrations</h1>

      {registrations.length === 0 ? (
        <p>You have not registered for any events yet.</p>
      ) : (
        <div className="event-grid">
          {registrations.map((registration) => (
            <div className="event-card" key={registration._id}>
              <h2>
                {registration.event?.name || "Event unavailable"}
              </h2>

              {registration.event && (
                <>
                  <p>Category: {registration.event.category}</p>
                  <p>Fee: ₹{registration.event.fee}</p>

                  <p>
                    Date:{" "}
                    {new Date(
                      registration.event.date
                    ).toLocaleDateString()}
                  </p>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyRegistrations;