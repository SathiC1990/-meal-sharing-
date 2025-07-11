"use client";
import React, { useEffect, useState } from "react";
import styles from "./MealsList.module.css";
import Meal from "../Meal/Meal";
import api from "@/utils/api";
import Link from "next/link";

export default function MealsList({ limit }) {
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("title"); // Default sort key
  const [sortDirection, setSortDirection] = useState("asc"); // Default sort direction

  // const response = await fetch(api("/meals"));
  async function fetchMeals() {
    try {
      const url = limit
        ? api(`/meals?limit=${limit}`)
        : api(
            `/meals${
              query ? `?title=${query}&` : "?"
            }sortKey=${sort}&sortDir=${sortDirection}`
          );

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch meals");
      }
      const data = await response.json();
      setMeals(data);
      //  setMeals(limit ? data.slice(0, limit) : data);
    } catch (error) {
      setError("Error fetching meals: " + error.message);
    }
  }
  useEffect(() => {
    fetchMeals(); // Initial fetch

    const intervalId = setInterval(() => {
      fetchMeals(); // Fetch meals every 5 seconds
    }, 5000);

    // Cleanup interval on unmount or dependency change
    return () => clearInterval(intervalId);
  }, [query, limit, sort, sortDirection]);

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
  /*return (
    <div>
      <h2 className={styles.heading}>Meals List</h2>
      <div className={styles.grid}>
        /*
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
  );*/

  return (
    <div>
      <h2 className={styles.heading}>Meals List</h2>
      {/* Search box and button */}
      {!limit && (
        <>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search meals by title"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className={styles.searchInput}
            />
            <button
              onClick={() => setQuery(searchText.trim())}
              className={styles.searchButton} // <-- add this
            >
              Search
            </button>
          </div>
          {/* Sort options*/}
          <div className={styles.sortContainer}>
            <label>
              Sort by:
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className={styles.sortSelect}
              >
                <option value="title">Title</option>
                <option value="price">Price</option>
                <option value="when">Date</option>
              </select>
            </label>

            <label>
              Direction:
              <select
                value={sortDirection}
                onChange={(e) => setSortDirection(e.target.value)}
                className={styles.sortSelect}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </label>
          </div>
        </>
      )}
      <div className={styles.grid}>
        {meals.map((meal) => (
          <Link key={meal.id} href={`/meals/${meal.id}`}>
            <Meal
              title={meal.title}
              description={meal.description}
              price={meal.price}
              max_reservations={meal.max_reservations}
              total_reservations={meal.total_reservations}
              when={meal.when}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
