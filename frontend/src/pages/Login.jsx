import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import authService from "../services/auth";

import "./Login.css";

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const { login } = useAuth();

    const handleLogin = async (e) => {
    e.preventDefault();

    try {
        const res = await authService.login({
        email,
        password,
        });

        login(res.token);

        toast.success("Login Successful");

        navigate("/dashboard");

    } catch (err) {
        toast.error(
        err.response?.data?.message || "Login Failed"
        );
    }
    };

  return (
    <div className="login-container">

      <form
        className="login-card"
        onSubmit={handleLogin}
      >

        <h2>RentPilot Login</h2>

        <input
          type="email"
          placeholder="Email"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button type="submit">
          Login
        </button>

      </form>

    </div>
  );

}