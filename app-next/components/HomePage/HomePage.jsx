import HYFLogo from "@/assets/hyf.svg";
import Image from "next/image";
import "./HomePage.css";
import MealsList from "@/components/MealsList/MealsList";

const HomePage = () => {
  return (
    <main>
      <h1 className="welcomeTitle">Welcome to Meal Sharing</h1>

      <MealsList /> 
    </main>
  );
};

export default HomePage;
