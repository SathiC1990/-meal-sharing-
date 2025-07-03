"use client";
import React, { useEffect, useState } from "react";
import ReservationForm from "../ReservationsForm/ReservationsForm";
import styles from "./MealDetail.module.css";
import ReviewForm from "../ReviewForm/ReviewForm";

export default function MealDetail({ mealId }) {
  const [meal, setMeal] = useState(null);
  const [error, setError] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    async function fetchMeal() {
      try {
        const res = await fetch(`http://localhost:3001/api/meals/${mealId}`);
        if (!res.ok) throw new Error("Meal not found");
        const data = await res.json();
        setMeal(data);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchMeal();
  }, [mealId]);

  if (error) return <p>{error}</p>;
  if (!meal) return <p>Loading...</p>;

  const availableSpots = meal.max_reservations - (meal.total_reservations || 0);

  return (
    <div className={styles.detailContainer}>
      <h2>{meal.title}</h2>
      <p>{meal.description}</p>
      <p>
        <strong>Price:</strong> {meal.price} DKK
      </p>
      <p>
        <strong>Date:</strong> {new Date(meal.when).toLocaleString()}
      </p>
      <p>
        <strong>Available Spots:</strong> {availableSpots}
      </p>

      {availableSpots > 0 ? (
        <ReservationForm mealId={mealId} />
      ) : (
        <p style={{ color: "red" }}>No seats available</p>
      )}
      {/* Toggle button */}
      <button onClick={() => setShowReviewForm((prev) => !prev)}>
        {showReviewForm ? "Hide Review Form" : "Leave a Review"}
      </button>

      {/* Conditionally show the review form */}
      {showReviewForm && <ReviewForm mealId={mealId} />}
    </div>
  );
}
