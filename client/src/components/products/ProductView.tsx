import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

interface Props {}

function ProductView({}: Props) {
	const { id } = useParams();

	const product = useQuery(["product"], async () => {
		const { data } = await axios.get(
			`http://localhost:5000/api/products/${id}`
		);
		return data;
	});

	if (product.isLoading) {
		return <div>loading...</div>;
	}

	const { data } = product;
	console.log(data);

	return (
		<div>
			<div>
				{data.photos &&
					Object.values(data.photos).map((photo: any) => (
						<img src={photo} />
					))}
			</div>

			<Link to={`/store/${data.store_id}`}>Back to store</Link>

			<h1>{data.name}</h1>
			<p>$ {data.price}</p>
		</div>
	);
}

export default ProductView;
