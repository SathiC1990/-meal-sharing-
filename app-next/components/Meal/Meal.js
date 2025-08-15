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
  const imageMap = {
    "Italian Dinner": "/italian Dinner.jpeg",
    "Mexican Fiesta": "/Mexican Fiesta.jpeg",
    "Paneer Malikofta": "/Paneer malaiKofta.jpeg",
    "Panner Malikofta": "/Paneer malaiKofta.jpeg",
    "Sushi Night": "/SuShi download.jpeg",
    "Pasta Night": "/download.jpeg",
  };

  // Select image by title if exists, fallback to image prop, then default
  const mealImage = imageMap[title] || image || "/download.jpeg";

  return (
    <div className={styles.card}>
      <img
        src={mealImage}
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
