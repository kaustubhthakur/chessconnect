import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import authScreenAtom from "../../atoms/authAtom";
import userAtom from "../../atoms/userAtom";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const setAuthScreen = useSetRecoilState(authScreenAtom);
  const setUser = useSetRecoilState(userAtom);
  const [loading, setLoading] = useState(false);

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
      alert('loggedin')
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="form-container">
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={inputs.username}
            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={inputs.password}
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
          />
          <button onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "Hide" : "Show"} Password
          </button>
        </div>
        <div className="form-group">
          <button onClick={handleLogin} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
        <p>
          Don't have an account?{" "}
          <span onClick={() => setAuthScreen("signup")} style={{ color: "blue", cursor: "pointer" }}>
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}
