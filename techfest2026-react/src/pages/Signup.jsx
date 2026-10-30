import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { apiFetch } from "../api";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    try {
      const response = await apiFetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          data.message || data.errors?.[0]?.msg || "Registration failed"
        );
        return;
      }

      navigate("/login");
    } catch (error) {
      setMessage("Could not connect to server");
    }
  }

  return (
    <div className="page">
      <h1>Create Account</h1>

      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength="8"
          required
        />

        <button type="submit">Create Account</button>
      </form>

      {message && <p className="error-msg">{message}</p>}

      <p>
        Already registered? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Signup;