import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>© 2025 Meal Sharing App. All rights reserved.</p>
        <nav className={styles.nav}>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/meals">Meals</a>
          <a href="mailto:info@mealsharingapp.com">Contact Us</a>
          <a href="/privacy">Privacy Policy</a>
        </nav>
        <div className={styles.social}>
          {/* Add social icons/links here */}
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
