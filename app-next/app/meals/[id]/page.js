import MealDetail from "@/components/MealDetail/MealDetail";
import api from "@/utils/api";

export async function generateStaticParams() {
  const res = await fetch(api(`/meals`));
  const meals = await res.json();

  return meals.map((meal) => ({
    id: meal.id.toString(),
  }));
}

export default function MealDetailPage({ params }) {
  return <MealDetail mealId={params.id} />;
}
