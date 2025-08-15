import MealsList from "@/components/MealsList/MealsList";

export default function MealsPage() {
  return (
    <main>
      <h1>All Meals</h1>
      <MealsList /> {/* no limit to show all meals */}
    </main>
  );
}
