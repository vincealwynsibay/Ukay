import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

interface Props {}

export default function StoresList({}: Props) {
	const stores = useQuery(["stores"], async () => {
		const { data } = await axios.get("http://localhost:5000/api/stores");
		return data;
	});

	if (stores.isLoading) {
		return <div>loading...</div>;
	}

	console.log(stores.data);

	return (
		<div>
			<h1>Stores List</h1>
			{stores.data.results.map((store: any) => {
				return (
					<div>
						<Link to={`/store/${store.id}`}>
							<h1>{store.name}</h1>
						</Link>
						<p>{store.description}</p>
					</div>
				);
			})}
		</div>
	);
}
