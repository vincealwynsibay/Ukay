import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { useQuery } from "@tanstack/react-query";
import Register from "./components/auth/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StoreRegister from "./components/auth/StoreRegister";
import CustomerRegister from "./components/auth/CustomerRegister";
import { useAuthContext } from "./context/AuthContext";
import Login from "./components/auth/Login";
import StoreView from "./components/stores/StoreView";
import StoresList from "./components/stores/StoresList";
import CustomerView from "./components/customers/CustomerView";
import ProductsList from "./components/products/ProductsList";
import ProductView from "./components/products/ProductView";

function App() {
	// const { data, isLoading } = useQuery({
	// 	queryKey: ["users"],
	// 	queryFn: () =>
	// 		// fetch(`${}/api/users`).then((res) => res.json()),
	// });

	// if (isLoading) {
	// 	return <div>loading...</div>;
	// }

	// console.log(data);

	const context: any = useAuthContext();

	return (
		<>
			{context!.isAuthReady ? (
				<div className='App'>
					<BrowserRouter>
						<Routes>
							<Route path='/' element={<div>home</div>} />
							<Route path='/register' element={<Register />} />
							<Route path='/login' element={<Login />} />
							<Route
								path='/register/customer'
								element={<CustomerRegister />}
							/>
							<Route
								path='/register/store'
								element={<StoreRegister />}
							/>
							{/* Store */}
							<Route path='/store/:id' element={<StoreView />} />
							<Route path='/stores/' element={<StoresList />} />

							{/* Customer */}
							<Route
								path='/customers/:id'
								element={<CustomerView />}
							/>
							{/* Products */}
							<Route
								path='/products/'
								element={<ProductsList />}
							/>

							<Route
								path='/stores/:store_id/products'
								element={<ProductsList />}
							/>
							<Route
								path='/products/:id'
								element={<ProductView />}
							/>
						</Routes>
					</BrowserRouter>
				</div>
			) : (
				<div>loading...</div>
			)}
		</>
	);
}

export default App;
