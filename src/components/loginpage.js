import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    // Temporary Credentials for Testing
    const adminEmail = "admin@example.com";
    const adminPassword = "Admin@1234";
    const studentEmail = "student@example.com";
    const studentPassword = "Student@1234";

    if (email === adminEmail && password === adminPassword) {
      navigate("/admin-dashboard");
    } else if (email === studentEmail && password === studentPassword) {
      navigate("/dashboard");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white">
      <div className="bg-gray-900 p-8 rounded-2xl shadow-xl w-96 backdrop-blur-md">
        <h2 className="text-3xl font-extrabold text-center text-blue-400">Login</h2>
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4 mt-4">
          <div>
            <label className="block text-gray-300 font-semibold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-semibold">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-transform transform hover:scale-105"
          >
            Login
          </button>
        </form>

        {/* Display Test Credentials for Easy Access */}
        
      </div>
    </div>
  );
};

export default LoginPage;
