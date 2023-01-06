import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

interface Props {}

function StoreView({}: Props) {
	const { id } = useParams();

	const store = useQuery(["store"], async () => {
		const { data } = await axios.get(
			`http://localhost:5000/api/stores/${id}`
		);
		return data;
	});

	if (store.isLoading) {
		return <div>loading...</div>;
	}

	console.log(store.data);

	const { data } = store;
	const { user } = useAuthContext();
	console.log(user);

	return (
		<div>
			<Link to='/stores'>Back to stores</Link>
			{user.role === "store" && user.id.toString() === data.user_id ? (
				<div>
					<Link to={`/store/${id}/edit`}>Edit Store</Link>
				</div>
			) : null}
			<div>
				<img src={data.avatar} alt='' />
				<h1>{data.name}</h1>
				<p>{data.description}</p>
			</div>
		</div>
	);
}

export default StoreView;
