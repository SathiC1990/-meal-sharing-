import express from "express";
import knex from "../database_client.js";
import pkg from "body-parser";
const { json } = pkg;

const router = express.Router();

// Returns all meals with query options
router.get("/", async (req, res) => {
  try {
    const maxPrice = req.query.maxPrice ? parseFloat(req.query.maxPrice) : null;
    const availableReservations = req.query.availableReservations;
    const title = req.query.title;
    const afterDate = req.query.afterDate
      ? new Date(req.query.afterDate)
      : null;
    const beforeDate = req.query.beforeDate
      ? new Date(req.query.beforeDate)
      : null;

    const mealLimit = req.query.limit ? parseInt(req.query.limit) : null;
    const sortKey = req.query.sortKey;
    let sortDir = req.query.sortDir?.toLowerCase();
    const allowedSortDirs = ["asc", "desc"];
    const allowedSortKeys = ["when", "max_reservations", "price"];

    // Validate inputs
    if (req.query.maxPrice && isNaN(maxPrice)) {
      return res.status(400).json({ error: "maxPrice must be a number" });
    }

    if (
      availableReservations !== undefined &&
      availableReservations !== "true" &&
      availableReservations !== "false"
    ) {
      return res
        .status(400)
        .json({ error: "availableReservations must be 'true' or 'false'" });
    }
    const isAvailable = availableReservations === "true";

    if (req.query.afterDate && isNaN(afterDate.getTime())) {
      return res.status(400).json({ error: "afterDate must be a valid date" });
    }

    if (req.query.beforeDate && isNaN(beforeDate.getTime())) {
      return res.status(400).json({ error: "beforeDate must be a valid date" });
    }

    if (req.query.limit && (isNaN(mealLimit) || mealLimit <= 0)) {
      return res.status(400).json({ error: "limit must be a positive number" });
    }

    if (!allowedSortDirs.includes(sortDir)) {
      sortDir = "asc";
    }

    let query = knex("Meal");

    if (maxPrice !== null) {
      query = query.where("price", "<=", maxPrice);
    }

    if (availableReservations !== undefined) {
      query = query
        .leftJoin("Reservation", "Meal.id", "Reservation.meal_id")
        .groupBy("Meal.id", "Meal.price", "Meal.when", "Meal.max_reservations")
        .count("Reservation.id as total_reservations")
        .havingRaw(
          isAvailable
            ? "Meal.max_reservations > COUNT(Reservation.id)"
            : "Meal.max_reservations <= COUNT(Reservation.id)"
        )
        .select("Meal.*");
    } else {
      query = query.select("*");
    }

    if (title) {
      query = query.where("title", "like", `%${title}%`);
    }

    if (afterDate !== null) {
      query = query.where("when", ">", afterDate);
    }

    if (beforeDate !== null) {
      query = query.where("when", "<", beforeDate);
    }

    if (mealLimit !== null) {
      query = query.limit(mealLimit);
    }

    if (sortKey && allowedSortKeys.includes(sortKey)) {
      query = query.orderBy(sortKey, sortDir);
    }

    const meals = await query;
    res.json(meals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving meals" });
  }
});
//Returns the meal by id
router.get("/:id", async (req, res) => {
  try {
    const meal = await knex("Meal").where({ id: req.params.id }).first();

    if (!meal) {
      return res.status(404).json({ error: "Meal not found" });
    }

    res.json(meal);
  } catch (error) {
    console.error("Error fetching meal:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Adds a new meal to the database
router.post("/", async (req, res) => {
  try {
    const [id] = await knex("Meal").insert(req.body);
    res.status(201).json({ message: "Meal created", id });
  } catch (error) {
    console.error("Error creating meal:", error);
    res.status(500).json({ error: "Error creating meal" });
  }
});

//Updates the meal by id

router.put("/:id", async (req, res) => {
  const updated = await knex("Meal")
    .where({ id: req.params.id })
    .update(req.body);
  if (!updated) return res.status(404).json({ error: "Meal not found" });
  res.json({ message: "Meal updated" });
});

// Deletes the meal by id
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await knex("Meal").where({ id: req.params.id }).del();
    if (!deleted) return res.status(404).json({ error: "Meal not found" });
    res.json({ message: "Meal deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting meal" });
  }
});

export default router;
