import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, password));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<>
			<h1 className="sign-up">Sign Up</h1>
			<form className="form" onSubmit={handleSubmit}>
				<ul className="signuperrors">
					{errors.map((error, idx) => (
						<li key={idx} className="error-text">{error}</li>
					))}
				</ul>
				<label className="form-label">
					Email
					<input
						type="email"
						maxLength={40}
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>
				<label className="form-label">
					Username
					<input
						type="text"
						maxLength={40}
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</label>
				<label className="form-label">
					Password
					<input
						type="password"
						maxLength={40}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				<label className="form-label">
					Confirm Password
					<input
						type="password"
						maxLength={40}
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
				<button type="submit" className="submit-label">Sign Up</button>
			</form>
		</>
	);
}

export default SignupFormModal;
