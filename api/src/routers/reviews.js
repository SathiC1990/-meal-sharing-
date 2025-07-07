import express, { Router } from "express";
import knex from "../database_client.js";

const router = express.Router();
//Returns all reviews.
router.get("/", async (req, res) => {
  try {
    const reviews = await knex("Review").select("*");
    res.json(reviews);
  } catch {
    res.status(500).json({ error: "Error retrieving reviews" });
  }
});

//Returns all reviews for a specific meal.
router.get("/meal/:meal_id", async (req, res) => {
  try {
    const mealReview = await knex("Review")
      .where({ meal_id: req.params.meal_id })
      .select("*");

    if (mealReview.length === 0) {
      return res.status(404).json({ error: "No reviews found for this meal" });
    }

    res.json(mealReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving review" });
  }
});

//Adds a new review to the database

router.post("/:mealId/reviews", async (req, res) => {
  const meal_id = Number(req.params.mealId);
  const { title, description, stars, created_date } = req.body;

  if (
    typeof title !== "string" ||
    typeof description !== "string" ||
    typeof stars !== "number" ||
    stars < 1 ||
    stars > 5 ||
    !created_date ||
    isNaN(Date.parse(created_date))
  ) {
    return res.status(400).json({ error: "Invalid input" });
  }

  try {
    const [id] = await knex("Review").insert({
      title,
      description,
      meal_id,
      stars,
      created_date,
    });
    res.status(201).json({ message: "Review created", id });
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ error: "Server error" });
  }
});

//Updates the review by id.

router.put("/:id", async (req, res) => {
  try {
    const { title, description, meal_id, stars, created_date } = req.body;

    // Validate all fields (assuming full update required)
    if (
      typeof title !== "string" ||
      title.trim() === "" ||
      typeof description !== "string" ||
      description.trim() === "" ||
      typeof meal_id !== "number" ||
      typeof stars !== "number" ||
      stars < 1 ||
      stars > 5 ||
      !created_date ||
      isNaN(Date.parse(created_date))
    ) {
      return res.status(400).json({
        error:
          "Invalid input: please provide valid title, description, meal_id, stars (1–5), and created_date.",
      });
    }

    // Perform update on the specific review by ID
    const updatedRows = await knex("Review")
      .where({ id: req.params.id })
      .update({
        title,
        description,
        meal_id,
        stars,
        created_date,
      });

    if (updatedRows === 0) {
      // No review with that id found
      return res.status(404).json({ error: "Review not found" });
    }

    res.status(200).json({ message: "Review updated" });
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).json({ error: "Error updating review" });
  }
});

//Deletes the review by id
router.delete("/:id", async (req, res) => {
  try {
    const deleteReview = await knex("Review")
      .where({ id: req.params.id })
      .delete(req.body);
    if (!deleteReview) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.json({ message: "Review deleted", deleteReview });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving review" });
  }
});
export default router;
