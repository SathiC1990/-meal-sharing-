
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

});

export default router;
