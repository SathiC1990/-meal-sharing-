// components/MealsList/MealsList.jsx
"use client";
import React, { useEffect, useState } from "react";
import styles from "./MealsList.module.css";
import Meal from "../Meal/Meal";
import api from "@/utils/api";

export default function MealsList() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    async function fetchMeals() {
      try {
        const response = await fetch(api("/meals"));
        if (!response.ok) {
          throw new Error("Failed to fetch meals");
        }
        const data = await response.json();
        setMeals(data);
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    }
    fetchMeals();
  }, []);

  return (
    <div>
      <h2 className={styles.heading}>Meals List</h2>
      {meals.length === 0 ? (
        <p>No meals found</p>
      ) : (
        <div className={styles.grid}>
          {meals.map((meal) => (
            <Meal key={meal.id} meal={meal} />
          ))}
        </div>
      )}
    </div>
  );
}
