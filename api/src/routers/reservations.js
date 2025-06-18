import express, { Router } from "express";
import knex from "../database_client.js";

const router = express.Router();
//Returns all reservations
router.get("/", async (req, res) => {
  try {
    const reservations = await knex("Reservation").select("*");
    res.json(reservations);
  } catch {
    res.status(500).json({ error: "Error retrieving reservations" });
  }
});
//Adds a new reservation to the database
router.post("/", async (req, res) => {
  try {
    const [id] = await knex("Reservation").insert(req.body);
    res.status(201).json({ message: "Reservation created", id });
  } catch {
    res.status(500).json({ error: "Error creating reservation" });
  }
});
//Returns a reservation by id
router.get("/:id", async (req, res) => {
  const reservation = await knex("Reservation")
    .where({ id: req.params.id })
    .first();
  if (!reservation)
    return res.status(404).json({ error: "Reservation not found" });
  res.json(reservation);
});
//Updates the reservation by id
router.put("/:id", async (req, res) => {
  const updated = await knex("Reservation")
    .where({ id: req.params.id })
    .update(req.body);
  if (!updated) return res.status(404).json({ error: "Reservation not found" });
  res.json({ message: "Reservation updated" });
});
//Deletes the reservation by id
router.delete("/:id", async (req, res) => {
  const deleted = await knex("Reservation").where({ id: req.params.id }).del();
  if (!deleted) return res.status(404).json({ error: "Reservation not found" });
  res.json({ message: "Reservation deleted" });
});

export default router;
