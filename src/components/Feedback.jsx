import React, { useState } from "react";
import emailjs from "@emailjs/browser";
const Feedback = () => {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!rating) {
      setError("Please select a rating before submitting.");
      return;
    }

    const templateParams = {
      rating: rating,      // 👍 or 👎
      feedback: feedback,  // Text from textarea
      time: new Date().toLocaleString(), // Optional timestamp
    };

    emailjs
      .send(
        "service_qil3oih",   // Replace with your EmailJS Service ID
        "template_a7otjvf",  // Replace with your EmailJS Template ID
        templateParams,
        "5EWXAcO7w9OmFMii5"    // Replace with your EmailJS Public Key
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          setSubmitted(true);
          setError("");
        },
        (error) => {
          console.error("FAILED...", error);
          setError("Failed to send feedback. Please try again later.");
        }
      );
  };

  if (submitted)
    return <p className="success">✅ Thanks for your feedback!</p>;

  return (
    <div className="feedback-section">
      <h3>Was this cover letter helpful?</h3>

      <div className="rating-buttons">
        <button
          className={rating === "👍" ? "selected" : ""}
          onClick={() => setRating("👍")}
        >
          👍
        </button>
        <button
          className={rating === "👎" ? "selected" : ""}
          onClick={() => setRating("👎")}
        >
          👎
        </button>
      </div>

      <textarea
        rows={5}
        cols={30}
        placeholder="Additional feedback (optional)"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button
        className="submit-feedback"
        onClick={handleSubmit}
        disabled={!rating}
      >
        Submit Feedback
      </button>
    </div>
  );
};

export default Feedback;
