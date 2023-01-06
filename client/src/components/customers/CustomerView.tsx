import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

interface Props {}

function CustomerView({}: Props) {
	const { id } = useParams();
	const customer = useQuery(["customer"], async () => {
		const { data } = await axios.get(
			`http://localhost:5000/api/customers/${id}`
		);
		return data;
	});

	if (customer.isLoading) {
		return <div>loading...</div>;
	}

	const { data } = customer;
	const { user } = useAuthContext();
	return (
		<div>
			{user.role === "store" && user.id.toString() === data.user_id ? (
				<div>
					<Link to={`/store/${id}/edit`}>Edit Store</Link>
				</div>
			) : null}
			<img src={data.avatar} alt='' />
			<h1>{data.name}</h1>
			<p>{data.description}</p>
		</div>
	);
}

export default CustomerView;
