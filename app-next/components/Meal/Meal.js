import React from "react";
import styles from "./Meal.module.css";
export default function Meal({
  title,
  description,
  price,
  max_reservations,
  total_reservations,
  when,
}) {
  return (
    <div className={styles.card}>
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
