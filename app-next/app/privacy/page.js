import React from "react";
import styles from "@/components/Footer/footer.module.css";

export default function PrivacyPage() {
  return (
    <main className={styles.footer}>
      <h1>Privacy Policy</h1>
      <p>
        Your privacy is important to us. This policy explains how we collect,
        use, and protect your personal information.
      </p>
      <h2>Information We Collect</h2>
      <p>
        We may collect information such as your name, email address, and usage
        data.
      </p>
      <h2>How We Use Information</h2>
      <p>
        We use your data to improve our services and personalize your
        experience.
      </p>
      <h2>Data Security</h2>
      <p>We implement security measures to protect your data.</p>
      <h2>Cookies</h2>
      <p>Our website uses cookies to enhance your experience.</p>
      <h2>Contact Us</h2>
      <p>
        If you have any questions about this privacy policy, please contact us.
      </p>
    </main>
  );
}
