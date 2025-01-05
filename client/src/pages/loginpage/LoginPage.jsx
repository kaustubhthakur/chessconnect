import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import authScreenAtom from "../../atoms/authScreenAtom";
import userAtom from "../../atoms/userAtom";
import "./LoginPage.css";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const setAuthScreen = useSetRecoilState(authScreenAtom);
  const setUser = useSetRecoilState(userAtom);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:9000/auth/login", {
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
      alert("Logged in successfully!");
      navigate("/"); // Navigate to the homepage
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-heading">Login</h2>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={inputs.username}
            onChange={(e) =>
              setInputs((inputs) => ({ ...inputs, username: e.target.value }))
            }
            placeholder="Enter your username"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              value={inputs.password}
              onChange={(e) =>
                setInputs((inputs) => ({ ...inputs, password: e.target.value }))
              }
              placeholder="Enter your password"
            />
            <button
              className="toggle-password"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <button
          className="login-button"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="login-footer">
          Don&apos;t have an account?{" "}
          <span className="signup-link">
            <Link to="/register">Register</Link>
          </span>
        </p>
      </div>
    </div>
  );
}
