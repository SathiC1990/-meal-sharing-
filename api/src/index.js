import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import knex from "./database_client.js";
import nestedRouter from "./routers/nested.js";
import mealsRouter from "./routers/meals.js";
import reservationsRouter from "./routers/reservations.js";
import reviewsRouter from "./routers/reviews.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/api/meals*", mealsRouter);
app.use("/api/reservations", reservationsRouter);
app.use("/api/reviews", reviewsRouter);

const apiRouter = express.Router();

// You can delete this route once you add your own routes
apiRouter.get("/", async (req, res) => {
  const SHOW_TABLES_QUERY =
    process.env.DB_CLIENT === "pg"
      ? "SELECT * FROM pg_catalog.pg_tables;"
      : "SHOW TABLES;";
  const tables = await knex.raw(SHOW_TABLES_QUERY);
  res.json({ tables });
});

// This nested router example can also be replaced with your own sub-router
apiRouter.use("/nested", nestedRouter);

app.use("/api", apiRouter);

app.listen(process.env.PORT, () => {
  console.log(`API listening on port ${process.env.PORT}`);
});
//Future-meal
app.get("/future-meals", async (req, res) => {
  try {
    const meals = await knex("Meal").where("when", ">", knex.fn.now());
    if (!meals) {
      return res.status(404).json({ message: "No future meals found" });
    }
    res.json(meals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//past-meal
app.get("/past-meals", async (req, res) => {
  try {
    const now = new Date();
    const meals = await knex("Meal").where("when", "<", now);
    if (!meals) {
      return res.status(404).json({ message: "No past meals found" });
    }
    res.json(meals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//all-meal
app.get("/all-meals", async (req, res) => {
  try {
    const meals = await knex("Meal").orderBy("id");
    if (!meals) {
      return res.status(404).json({ message: "No meals found" });
    }
    res.json(meals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//First-meal
app.get("/first-meal", async (req, res) => {
  try {
    const meal = await knex("Meal").orderBy("id").first();
    if (!meal) {
      return res.status(404).json({ message: "No meals available" });
    }
    res.json(meal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//last-meal
app.get("/last-meal", async (req, res) => {
  try {
    const meal = await knex("Meal").orderBy("id", "desc").first();
    if (!meal) {
      return res.status(404).json({ message: "No meals available" });
    }
    res.json(meal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
