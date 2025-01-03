import { useState } from "react";
import { useSetRecoilState } from "recoil";
import authScreenAtom from "../../atoms/authScreenAtom";
import userAtom from "../../atoms/userAtom";
import "./RegisterPage.css"; // Importing CSS file

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
        console.error("Signup Error:", data.error);
        return;
      }

      localStorage.setItem("user-threads", JSON.stringify(data));
      setUser(data);
      alert('registered')
    } catch (error) {
      console.error("Signup Error:", error);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-heading">Register</h2>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={inputs.username}
            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={inputs.email}
            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={inputs.password}
              onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            />
            <button
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <button className="register-button" onClick={handleSignup}>
          Register
        </button>
        <p className="register-footer">
          Already have an account?{" "}
          <span
            className="login-link"
            onClick={() => setAuthScreen("login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
