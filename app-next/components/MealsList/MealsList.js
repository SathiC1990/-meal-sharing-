// components/MealsList/MealsList.jsx
"use client";
import React, { useEffect, useState } from "react";
import styles from "./MealsList.module.css";
import Meal from "../Meal/Meal";
import api from "@/utils/api";

export default function MealsList() {
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState(null);

  async function fetchMeals() {
    try {
      const response = await fetch(api("/meals"));
      if (!response.ok) {
        throw new Error("Failed to fetch meals");
      }
      const data = await response.json();
      setMeals(data);
    } catch (error) {
      setError("Error fetching meals: " + error.message);
    }
  }
  useEffect(() => {
    fetchMeals();
  }, []);

  // If error occurred
  if (error) {
    return (
      <div>
        <h2 className={styles.heading}>Meals List</h2>
        <p className={styles.error}>{error}</p>
      </div>
    );
  }

  // If no meals found
  if (meals.length === 0) {
    return (
      <div>
        <h2 className={styles.heading}>Meals List</h2>
        <p>No meals found</p>
      </div>
    );
  }

  // If meals are available
  return (
    <div>
      <h2 className={styles.heading}>Meals List</h2>
      <div className={styles.grid}>
        {meals.map((meal) => (
          <Meal
            key={meal.id}
            title={meal.title}
            description={meal.description}
            price={meal.price}
            max_reservations={meal.max_reservations}
            total_reservations={meal.total_reservations}
            when={meal.when}
          />
        ))}
      </div>
    </div>
  );
}
