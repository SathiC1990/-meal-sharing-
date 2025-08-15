"use client";
import React from "react";
import Link from "next/link";
import styles from "./navbar.module.css";

const languages = {
  en: "English",
  da: "Dansk",
};

export default function Navbar() {
  // Initialize locale as string "en"
  const [locale, setLocale] = React.useState("en");

  const switchLanguage = () => {
    // Compare with string "en", switch to "da" or back
    setLocale((prev) => (prev === "en" ? "da" : "en"));
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">Meal Sharing App</Link>
      </div>

      {/* Language toggle button */}
      <button className={styles.languageToggle} onClick={switchLanguage}>
        {/* Show language name of the current locale */}
        {languages[locale]}
      </button>

      <ul className={styles.navLinks}>
        <li>
          <Link href="/">{locale === "da" ? "Hjem" : "Home"}</Link>
        </li>
        <li>
          <Link href="/about">{locale === "da" ? "Om os" : "About Us"}</Link>
        </li>
        <li>
          <Link href="/meals">{locale === "da" ? "Måltider" : "Meals"}</Link>
        </li>
      </ul>
    </nav>
  );
}
