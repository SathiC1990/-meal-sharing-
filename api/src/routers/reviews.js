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

router.post("/", async (req, res) => {
  try {
    const [id] = await knex("Review").insert(req.body);
    res.status(201).json({ message: "Review created", id });
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ error: "Error creating review" });
  }
});

//Returns a review by id.
router.get("/:id", async (req, res) => {
  try {
    const review = await knex("Review").where({ id: req.params.id }).first();

    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    res.json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving review" });
  }
});
//Updates the review by id.
router.put("/:id", async (req, res) => {
  try {
    const updateReview = await knex("Review")
      .where({ id: req.params.id })
      .update(req.body);
    if (!updateReview) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.json(updateReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving review" });
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
