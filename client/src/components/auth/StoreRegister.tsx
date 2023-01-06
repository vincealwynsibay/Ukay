import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";

interface Props {}

function StoreRegister({}: Props) {
	const [formData, setFormData] = useState<any>({
		avatar: {},
		name: "",
		description: "",
	});

	const { token } = useAuthContext();

	const mutation = useMutation(async (data: any) => {
		return await axios.post("http://localhost:5000/api/stores", data, {
			headers: {
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${token}`,
			},
		});
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = new FormData();
		for (const [key, value] of Object.entries(formData)) {
			data.append(key, value as any);
		}

		mutation.mutate(data);
	};

	const handleAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return;
		const file = e.target.files[0];
		setFormData({ ...formData, avatar: file });
	};

	return (
		<div>
			<h1>Store Register</h1>
			<form onSubmit={handleSubmit}>
				<div className='avatar'>
					<label htmlFor='avatar'>Avatar</label>
					<input
						type='file'
						name='avatar'
						id='avatar'
						onChange={handleAvatar}
					/>
				</div>
				<div className='name'>
					<label htmlFor='name'>Name</label>
					<input
						type='text'
						onChange={handleChange}
						name='name'
						id='name'
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

export default StoreRegister;
