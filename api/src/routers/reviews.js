import express from "express";
import knex from "../database_client.js";

const router = express.Router();

// GET all reviews
router.get("/", async (req, res) => {
  try {
    const reviews = await knex("Review").select("*");
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving reviews" });
  }
});

// GET reviews for a specific meal
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

// POST a review for a meal
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
    const [{ id }] = await knex("Review")
      .insert({
        title,
        description,
        meal_id,
        stars,
        created_date,
      })
      .returning("id");
    res.status(201).json({ message: "Review created", id });
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// GET review by ID
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

// PUT (update) review by ID
router.put("/:id", async (req, res) => {
  try {
    const { title, description, meal_id, stars, created_date } = req.body;

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
      return res.status(404).json({ error: "Review not found" });
    }

    res.status(200).json({ message: "Review updated" });
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).json({ error: "Error updating review" });
  }
});

// DELETE review by ID
router.delete("/:id", async (req, res) => {
  try {
    const deleteReview = await knex("Review")
      .where({ id: req.params.id })
      .delete(); // no req.body here

    if (!deleteReview) {
      return res.status(404).json({ error: "Review not found" });
    }

    res.json({ message: "Review deleted", deleteReview });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting review" });
  }
});

export default router;
