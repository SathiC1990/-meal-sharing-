"use client";
import React, { useState } from "react";

export default function ReviewForm({ mealId }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    stars: 5,
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toMySQLDateTime = (date) =>
    date.toISOString().slice(0, 19).replace("T", " ");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const review = {
      ...formData,
      meal_id: mealId,
      created_date: toMySQLDateTime(new Date()),
    };

    try {
      const res = await fetch("http://localhost:3001/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review),
      });

      if (!res.ok) throw new Error("Failed to submit review");
      setMessage("Review submitted successfully!");
      setFormData({ title: "", description: "", stars: 5 });
    } catch {
      setMessage("Failed to submit review. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Leave a Review</h3>
      <input
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Your review"
        value={formData.description}
        onChange={handleChange}
        required
      />
      <label>
        Rating:
        <select name="stars" value={formData.stars} onChange={handleChange}>
          {[5, 4, 3, 2, 1].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </label>
      <button type="submit">Submit Review</button>
      {message && <p>{message}</p>}
    </form>
  );
}
