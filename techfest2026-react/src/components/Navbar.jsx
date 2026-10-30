import { Link, useNavigate } from "react-router-dom";

import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, loading, logout } = useAuth();

  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <nav className="navbar">
      <h2>TechFest 2026</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/events">Events</Link>
        <Link to="/register">Register</Link>
        <Link to="/gallery">Gallery</Link>
        <Link to="/contact">Contact</Link>

        {!loading && !user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Create Account</Link>
          </>
        )}

        {!loading && user && (
          <>
            <Link to="/my-registrations">My Registrations</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>

      <button onClick={toggleTheme}>
        {theme === "light" ? "Switch to Dark" : "Switch to Light"}
      </button>
    </nav>
  );
}

export default Navbar;