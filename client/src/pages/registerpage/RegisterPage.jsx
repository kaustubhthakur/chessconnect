import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import userAtom from "../../atoms/userAtom";
import './RegisterPage.css'
import authScreenAtom from "../../atoms/authAtom";
export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const setAuthScreen = useSetRecoilState(authScreenAtom);
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const setUser = useSetRecoilState(userAtom);

  const handleSignup = async () => {
    try {
      const res = await fetch("http://localhost:9000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      const data = await res.json();

      if (data.error) {
        alert(`Error: ${data.error}`);
        return;
      }

      localStorage.setItem("user-threads", JSON.stringify(data));
      setUser(data);
      alert('loggedin')
      alert("User registered successfully!");
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="register-page">
      <h1 className="register-heading">Register</h1>
      <div className="register-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={inputs.username}
            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            value={inputs.email}
            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="password-group">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="toggle-password"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <button className="register-button" onClick={handleSignup}>
          Register
        </button>
        <p className="register-footer">
          Already a user?{" "}
          <button
            type="button"
            className="login-link"
            onClick={() => setAuthScreen("login")}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
