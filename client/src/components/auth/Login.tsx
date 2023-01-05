import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";

interface Props {}

function Login({}: Props) {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const { email, password } = formData;

	const { dispatch }: any = useAuthContext();

	const mutation = useMutation((data: any) => {
		return axios.post("http://localhost:5000/api/auth", data);
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const user = await mutation.mutateAsync(formData);
		dispatch({ type: "LOGIN", payload: user.data.token });
	};

	return (
		<div>
			<h1>Login</h1>

			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor='email'>Email</label>
					<input
						type='email'
						name='email'
						value={email}
						onChange={handleChange}
					/>
				</div>
				<div>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						name='password'
						value={password}
						onChange={handleChange}
					/>
				</div>
				<button type='submit'>Login</button>
			</form>
		</div>
	);
}

export default Login;
