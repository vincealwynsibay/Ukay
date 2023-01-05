import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
interface Props {}

function CustomerRegister({}: Props) {
	const [formData, setFormData] = useState({
		avatar: "",
		username: "",
		description: "",
	});

	const { avatar, username, description } = formData;

	const mutation = useMutation((formData: any) => {
		return axios.post("http://localhost:5000/api/customers", formData);
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = await mutation.mutateAsync({
			avatar,
			username,
			description,
		});

		console.log(data);
	};

	return (
		<div>
			<h1>Customer Register</h1>
			<form onSubmit={handleSubmit}>
				<div className='avatar'>
					<label htmlFor='avatar'>Avatar</label>
					<input
						type='file'
						onChange={handleChange}
						name='avatar'
						id='avatar'
					/>
				</div>
				<div className='username'>
					<label htmlFor='username'>Username</label>
					<input
						type='text'
						onChange={handleChange}
						name='username'
						id='username'
					/>
				</div>
				<div className='description'>
					<label htmlFor='description'>Description</label>
					<input
						type='text'
						onChange={handleChange}
						name='description'
						id='description'
					/>
				</div>
				<button type='submit'>Complete</button>
			</form>
		</div>
	);
}

export default CustomerRegister;
