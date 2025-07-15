"use client";
import React from "react";
import styles from "./Meal.module.css";
export default function Meal({
  title,
  description,
  price,
  max_reservations,
  total_reservations,
  when,
  image,
}) {
  return (
    <div className={styles.card}>
      <img
        src={image || "/download.jpeg"}
        alt={title}
        className={styles.mealImage}
        style={{ width: "300px", height: "200px", objectFit: "cover" }}
      />
      <h3>{title}</h3>
      <p>{description}</p>
      <p>
        <strong>Price:</strong> {price} DKK
      </p>
      <p className={styles.reservations}>
        Available spots: {max_reservations - (total_reservations || 0)}
      </p>
      <p className={styles.date}>Date: {new Date(when).toLocaleString()}</p>
    </div>
  );
}
