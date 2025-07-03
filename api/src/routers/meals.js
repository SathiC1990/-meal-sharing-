
import pkg from "body-parser";
const { json } = pkg;

const router = express.Router();

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

//Adds a new meal to the database
router.post("/", async (req, res) => {
  try {
    const [id] = await knex("Meal").insert(req.body);
    res.status(201).json({ message: "Meal created", id });
  } catch {
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

});

export default router;
