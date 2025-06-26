import React from "react";
import styles from "./Meal.module.css";
export default function Meal({ meal }) {
  return (
    <div className={styles.card}>
      <h3>{meal.title}</h3>
      <p>{meal.description}</p>
      <p>
        <strong>Price:</strong> {meal.price} DKK
      </p>
      <p className={styles.reservations}>
        Available spots:{" "}
        {meal.max_reservations - (meal.total_reservations || 0)}
      </p>
      <p className={styles.date}>
        Date: {new Date(meal.when).toLocaleString()}
      </p>
    </div>
  );
}
