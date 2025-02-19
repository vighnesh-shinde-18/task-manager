import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");

  async function handleRegister(e) {
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      setMsg("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/users/register", {
        name,
        email,
        password,
      });

      if (response.status === 200) {
        setMsg("Registration successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
  
    } catch (error) {
      if (error.response) {

        if (error.response.status === 400 && error.response.data.error === "User already exists") {
          setMsg("User already exists! Please try logging in.");
        } else {
          setMsg(`Error: ${error.response.data.error || 'An error occurred!'}`);
        }
      } else {
        setMsg("An error occurred! Please try again.");
      }
    }
  }

  return (
    <div className="flex h-full flex-1 flex-col justify-center items-center my- lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
        <img alt="Task Manager Logo" src='../assets/task-manager-logo-light.jpg'/>
        <h2 className="text-2xl font-bold text-gray-900">Register to Task Manager</h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-4" onSubmit={handleRegister}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-900">
              User Name
            </label>
            <input
              id="username"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="block w-full rounded-md border border-gray-400 my-2 px-1 py-1.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>
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
          <p className={msg === "Registration successful! Redirecting to login..." ? "text-green-600" : "text-red-600"}>{msg}</p>
          <div>
            <button
              type="submit"
              className="w-full rounded-md bg-indigo-600 px-3 py-1.5 text-white hover:bg-indigo-500"
            >
              Register
            </button>
          </div>
        </form>
        <p className="mt-5 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-indigo-600 hover:text-indigo-500 cursor-pointer"
          >
            Log In
          </button>
        </p>
      </div>
    </div>
  );
}
