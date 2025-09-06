
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  const validateForm = () => {
    // Simple validation
    return (
      formData.name.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.password.trim() !== ""
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.currentTarget || e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const payload = {
          name: formData.name.trim(),
          email: formData.email.trim(),
          password: formData.password.trim(),
          displayName: formData.name.trim(),
        };
        // Determine API hosts to try
        const currentHost = typeof window !== "undefined" ? window.location.hostname : "localhost";
        const candidates = [
          `http://${currentHost}:5000`,
          "http://localhost:5000",
          "http://127.0.0.1:5000",
        ];
        let data;
        let lastError;
        for (const base of candidates) {
          try {
            ({ data } = await axios.post(`${base}/api/signup`, payload, {
              headers: { "Content-Type": "application/json" },
              timeout: 8000,
            }));
            break;
          } catch (errTry) {
            lastError = errTry;
          }
        }
        if (!data) throw lastError || new Error("Network Error");
        localStorage.setItem("currentUser", JSON.stringify({ id: data.user.id, name: data.user.name, email: data.user.email }));
        alert("Signup successful! 📌");
        navigate("/dashboard");
      } catch (err) {
        const status = err?.response?.status;
        const message = err?.response?.data?.error || (status === 409 ? "Email already registered" : (err?.message || "Something went wrong. Please try again."));
        alert(message);
      }
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          onInput={handleChange}
          autoComplete="new-password"
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupPage;
