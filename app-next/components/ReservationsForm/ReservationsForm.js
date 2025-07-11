"use client";
import React, { useState } from "react";
import api from "@/utils/api";

export default function ReservationForm({ mealId, onReservationSuccess }) {
  const [formData, setFormData] = useState({
    contact_name: "",
    contact_email: "",
    contact_phonenumber: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const toMySQLDateTime = (date) =>
    date.toISOString().slice(0, 19).replace("T", " ");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reservation = {
      ...formData,
      meal_id: mealId,
      number_of_guests: 1,
      created_date: toMySQLDateTime(new Date()),
    };

    try {
      const res = await fetch(api("/reservations"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reservation),
      });

      if (!res.ok) throw new Error();

      alert("Reservation successful!");
      setFormData({
        contact_name: "",
        contact_email: "",
        contact_phonenumber: "",
      });
      if (onReservationSuccess) {
        onReservationSuccess();
      }
    } catch {
      alert("Reservation failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Book a Seat</h3>
      <input
        name="contact_name"
        placeholder="Name"
        value={formData.contact_name}
        onChange={handleChange}
        required
      />
      <input
        name="contact_email"
        placeholder="Email"
        type="email"
        value={formData.contact_email}
        onChange={handleChange}
        required
      />
      <input
        name="contact_phonenumber"
        placeholder="Phone"
        value={formData.contact_phonenumber}
        onChange={handleChange}
        required
      />
      <button type="submit">Book Seat</button>
    </form>
  );
}
