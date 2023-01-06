import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useAuthContext } from "../../context/AuthContext";

interface Props {}

function Register({}: Props) {
	const [userFormData, setFormData] = useState({
		email: "",
		firstName: "",
		lastName: "",
		password: "",
		password2: "",
	});

	const { email, firstName, lastName, password, password2 } = userFormData;

	const navigate = useNavigate();

	const mutation = useMutation(async (userCredentials: any) => {
		return await axios.post(
			"http://localhost:5000/api/auth/register",
			userCredentials
		);
	});

	const { dispatch }: any = useAuthContext();
	const [role, setRole] = useState("customer");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...userFormData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (password !== password2) {
			alert("Password do not match");
		} else {
			console.log("Success", userFormData);
			const res = await mutation.mutateAsync({
				email,
				firstName,
				lastName,
				password,
				role,
			});
			dispatch({ type: "LOGIN", payload: res.data.token });

			if (role === "customer") {
				// register as customer
				navigate("/register/customer");
			} else {
				// register as vendor
				navigate("/register/store");
			}
		}
	};

	return (
		<div>
			<h1>Register</h1>
			<form onSubmit={handleSubmit}>
				<div className='firstName'>
					<label htmlFor='firstName'>First Name</label>
					<input
						type='text'
						onChange={handleChange}
						name='firstName'
						id='firstName'
					/>
				</div>
				<div className='lastName'>
					<label htmlFor='lastName'>Last Name</label>
					<input
						type='text'
						onChange={handleChange}
						name='lastName'
						id='lastName'
					/>
				</div>
				<div className='email'>
					<label htmlFor='email'>Email</label>
					<input
						type='email'
						onChange={handleChange}
						name='email'
						id='email'
					/>
				</div>
				<div className='password'>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						onChange={handleChange}
						name='password'
						id='password'
					/>
				</div>
				<div className='password2'>
					<label htmlFor='password2'>Confirm Password</label>
					<input
						type='password'
						onChange={handleChange}
						name='password2'
						id='password2'
					/>
				</div>
				<div className='role'>
					<label htmlFor='role'>Role</label>
					<div className='role'>
						<div className='' onClick={() => setRole("customer")}>
							customer
						</div>
						<div className='' onClick={() => setRole("store")}>
							store
						</div>
					</div>
				</div>

				<button type='submit'>Register</button>
			</form>
			{/* TODO: Register as store or customer depending on role selected */}
		</div>
	);
}

export default Register;
