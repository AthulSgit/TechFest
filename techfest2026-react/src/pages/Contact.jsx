import { useState } from "react";

function Contact() {
  const [feedback, setFeedback] = useState("");
  const [submittedFeedback, setSubmittedFeedback] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setSubmittedFeedback(feedback);
    setFeedback("");
  }

  return (
    <div className="page">
      <h1>Contact Us</h1>

      <p>Email: techfest2026@mbcet.ac.in</p>
      <p>Phone: +91 98765 43210</p>
      <p>Venue: MBCET Campus, Thiruvananthapuram</p>

      <h2>Feedback</h2>

      <form onSubmit={handleSubmit}>
        <label>Enter your feedback</label>

        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows="4"
          required
        />

        <button type="submit">Submit Feedback</button>
      </form>

      {submittedFeedback && (
        <div className="feedback-result">
          <h3>Your feedback:</h3>
          <p>{submittedFeedback}</p>
        </div>
      )}
    </div>
  );
}

export default Contact;