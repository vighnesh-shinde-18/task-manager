import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    if (email === "" || password === "") {
      setMsg("Please fill in all fields.");
      return
    }

    try {
      const response = await axios.post("http://localhost:8000/users/login", {
        email,
        password,
      });

      if (response.status === 200) {
        setMsg("Login successful. Redirecting to dashboard...");
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.reqUser));
      }

    } catch (error) {
      if (error.response) {

        if (error.response.status === 400 && error.response.data.error === "User not found") {
          setMsg("User not found. Please register.");
        } else if (error.response.status === 400 && error.response.data.error === "Unable to login, invalid credential") {
          setMsg(`Invalid credentials. Please try again.`);
        }
      } else {
        setMsg("An error occurred! Please try again.");
      }
    }
  }

  return (
    <div className="flex h-full flex-1 flex-col justify-center items-center py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
        <img alt="Task Manager Logo" src="../assets/task-manager-logo.jpg" />
        <h2 className="text-2xl font-bold text-gray-900">Login to Task Manager</h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block w-full rounded-md border border-gray-400 my-2 px-1 py-1.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="block w-full rounded-md border border-gray-400 my-2 px-1 py-1.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <p className={msg === "Login successful. Redirecting to dashboard..." ? "text-green-600" : "text-red-600"}>{msg}</p>
          <div>
            <button
              type="submit"
              className="w-full rounded-md bg-indigo-600 px-3 py-1.5 text-white hover:bg-indigo-500"
              onClick={handleLogin}>
              Login
            </button>
          </div>
        </form>
        <p className="mt-5 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <button onClick={() => navigate("/register")} className="text-indigo-600 hover:text-indigo-500 cursor-pointer">
            Register here
          </button>
        </p>
      </div>
    </div>
  );
}
