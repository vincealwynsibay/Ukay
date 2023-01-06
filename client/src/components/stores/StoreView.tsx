import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

interface Props {}

function StoreView({}: Props) {
	const { id } = useParams();
	const { user } = useAuthContext();

	const store = useQuery(["store"], async () => {
		const { data } = await axios.get(
			`http://localhost:5000/api/stores/${id}`
		);
		return data;
	});

	const products = useQuery(["products"], async () => {
		const { data } = await axios.get(
			`http://localhost:5000/api/stores/${id}/products`
		);
		return data;
	});

	if (store.isLoading || products.isLoading) {
		return <div>loading...</div>;
	}

	const { data: storeData } = store;
	const { data: productsData } = products;
	console.log(productsData);

	return (
		<div>
			<Link to='/stores'>Back to stores</Link>
			{store.isSuccess && (
				<>
					{user &&
					user.role === "store" &&
					user.id.toString() === storeData.user_id ? (
						<div>
							<Link to={`/store/${id}/edit`}>Edit Store</Link>
						</div>
					) : null}
					<div>
						<img src={storeData.avatar} alt='' />
						<h1>{storeData.name}</h1>
						<p>{storeData.description}</p>
					</div>
				</>
			)}

			<div>
				{products.isSuccess && productsData.length > 0 && (
					<div>
						<div>
							<h1>Products</h1>
							{productsData.map((product: any) => {
								return (
									<ul>
										<Link to={`/product/${product.id}`}>
											<li>{product.name}</li>
										</Link>
									</ul>
								);
							})}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default StoreView;
