import React, { useState } from "react";

interface Props {}

function StoreRegister({}: Props) {
	const [formData, setFormData] = useState({
		avatar: "",
		name: "",
		description: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(formData);
	};

	return (
		<div>
			<h1>Store Register</h1>
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
