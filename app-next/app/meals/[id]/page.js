import MealDetail from "@/components/MealDetail/MealDetail";

export async function generateStaticParams() {
  const res = await fetch("http://localhost:3001/api/meals");
  const meals = await res.json();

  return meals.map((meal) => ({
    id: meal.id.toString(),
  }));
}

export default function MealDetailPage({ params }) {
  return <MealDetail mealId={params.id} />;
}
