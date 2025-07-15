import styles from "./about.module.css";

export default function AboutPage() {
  return (
    <main className={styles.main}>
      <h1>About Meal Sharing App</h1>
      <p>
        Welcome to the Meal Sharing App — your go-to platform for discovering,
        sharing, and enjoying delicious meals with a vibrant community! Our
        mission is to connect food lovers and home cooks alike, making it easy
        to explore a variety of meals, reserve your spot, and share
        unforgettable dining experiences.
      </p>
      <h2>What We Offer</h2>
      <ul>
        <li>
          <strong>Diverse Meal Options:</strong> Browse through an extensive
          list of meals curated by passionate cooks from different cultures and
          styles.
        </li>
        <li>
          <strong>Easy Reservations:</strong> Secure your spot for meals
          effortlessly through our intuitive reservation system.
        </li>
        <li>
          <strong>Real-Time Availability:</strong> Get up-to-date information on
          available seats so you never miss out on your favorite dishes.
        </li>
        <li>
          <strong>User Reviews & Ratings:</strong> Share your feedback and read
          reviews to help others choose the best meals.
        </li>
        <li>
          <strong>Responsive Design:</strong> Access our app on any device —
          whether you're at home or on the go.
        </li>
      </ul>
      <h2>Our Vision</h2>
      <p>
        We believe that food is more than just nourishment — it's a way to build
        connections and create memories. Through our app, we aim to foster a
        warm and welcoming community where sharing a meal means sharing stories,
        culture, and joy.
      </p>
      <h2>Get Involved</h2>
      <p>
        Whether you're a seasoned cook looking to share your culinary skills or
        a food enthusiast eager to try new dishes, Meal Sharing App is the
        perfect place for you. Explore our meals, make reservations, leave
        reviews, and become part of a thriving food community today!
      </p>
      <p>Thank you for choosing Meal Sharing App — Bon appétit!</p>
    </main>
  );
}
