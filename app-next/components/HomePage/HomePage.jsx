import HYFLogo from "@/assets/hyf.svg";
import Image from "next/image";
import "./HomePage.css";
import MealsList from "@/components/MealsList/MealsList";
import Link from "next/link";



const HomePage = () => {
  return (<main>
      {/* Title & subtitle */}
      <h1>Welcome to Meal Sharing</h1>
      <p>Handpicked meals just for you 🍽️</p>

      {/* Show only first 3 meals */}
      <MealsList limit={3} />

      {/* Link/button to all meals page */}
      <Link href="/meals">
  <button type="button">See all meals</button>
</Link>



      {/* Footer */}
      <footer>© 2025 Meal Sharing</footer>
       </main>
  );
};
export default HomePage;
