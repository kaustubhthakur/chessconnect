import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import authScreenAtom from "../atoms/authAtom";
import userAtom from "../atoms/userAtom";

export default function RegisterPage() {
	const [showPassword, setShowPassword] = useState(false);
	const setAuthScreen = useSetRecoilState(authScreenAtom);
	const [inputs, setInputs] = useState({
		username: "",
		email: "",
		password: "",
	});

	const setUser = useSetRecoilState(userAtom);

	const handleRegister = async () => {
		try {
			const res = await fetch("/api/users/signup", {
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
            alert('registered!!')
		} catch (error) {
			alert(`Error: ${error.message}`);
		}
	};

	return (
		<div className="register-container">
			<div className="register-card">
				<h1 className="register-heading">Register</h1>
				<div className="form-group">
					<label>Username</label>
					<input
						type="text"
						onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
						value={inputs.username}
						required
					/>
				</div>
				<div className="form-group">
					<label>Email Address</label>
					<input
						type="email"
						onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
						value={inputs.email}
						required
					/>
				</div>
				<div className="form-group">
					<label>Password</label>
					<div className="password-group">
						<input
							type={showPassword ? "text" : "password"}
							onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
							value={inputs.password}
							required
						/>
						<button
							type="button"
							className="toggle-password"
							onClick={() => setShowPassword((prev) => !prev)}
						>
							{showPassword ? "Hide" : "Show"}
						</button>
					</div>
				</div>
				<div className="form-actions">
					<button onClick={handleRegister} className="register-button">
						Register
					</button>
				</div>
				<div className="form-footer">
					<p>
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
		</div>
	);
}
