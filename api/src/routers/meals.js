import express, { Router } from "express";
import knex from "../database_client.js";

const router = express.Router();

//Returns all meals
router.get("/", async (req, res) => {
  try {
    const meals = await knex("Meal").select("*");
    res.json(meals);
  } catch {
    res.status(500).json({ error: "Error retrieving meals" });
  }
});
//Adds a new meal to the database
router.post("/", async (req, res) => {
  try {
    const [id] = await knex("Meal").insert(req.body);
    res.status(201).json({ message: "Meal created", id });
  } catch {
    res.status(500).json({ error: "Error creating meal" });
  }
});

//Returns the meal by id
router.get("/:id", async (req, res) => {
  const meal = await knex("Meal").where({ id: req.params.id }).first();
  if (!meal) return res.status(404).json({ error: "Meal not found" });
  res.json(meal);
});

//Updates the meal by id

router.put("/:id", async (req, res) => {
  const updated = await knex("Meal")
    .where({ id: req.params.id })
    .update(req.body);
  if (!updated) return res.status(404).json({ error: "Meal not found" });
  res.json({ message: "Meal updated" });
});
//Deletes the meal by id
router.delete("/:id", async (req, res) => {
  const deleted = await knex("meal").where({ id: req.params.id }).del();
  if (!deleted) return res.status(404).json({ error: "Meal not found" });
  res.json({ message: "Meal deleted" });
});

export default router;
