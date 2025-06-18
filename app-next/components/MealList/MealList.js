"use client";
import React, { useEffect, useState } from "react";
import styles from "./MealsList.module.css";

const MealsList = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    async function fetchMeals() {
      try {
        const response = await fetch("http://localhost:3001/api/meals");
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
    <div className={styles.container}>
      <h2>Meals List</h2>
      {meals.map((meal) => (
        <div key={meal.id} className={styles.meal}>
          <h3>{meal.title}</h3>
          <p>{meal.description}</p>
          <p>Price: {meal.price} DKK</p>
        </div>
      ))}
    </div>
  );
};

export default MealsList;
