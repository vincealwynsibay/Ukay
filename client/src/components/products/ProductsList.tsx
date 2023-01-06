import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Link, useParams } from "react-router-dom";

interface Props {}

function ProductsList({}: Props) {
	const { store_id } = useParams();

	let products;

	products = useQuery(["products"], async () => {
		const { data } = await axios.get("http://localhost:5000/api/products");
		return data;
	});
	if (products.isLoading) {
		return <div>loading...</div>;
	}

	console.log(products.data);

	return (
		<div>
			<h1>Products List</h1>
			{products.data.results.map((product: any) => {
				return (
					<div key={product.id}>
						<Link to={`/products/${product.id}`}>
							<h1>{product.name}</h1>
						</Link>
						<p>$ {product.price}</p>
					</div>
				);
			})}
		</div>
	);
}

export default ProductsList;
