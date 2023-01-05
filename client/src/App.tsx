import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { useQuery } from "@tanstack/react-query";
import Register from "./components/auth/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StoreRegister from "./components/auth/StoreRegister";
import CustomerRegister from "./components/auth/CustomerRegister";
import { useAuthContext } from "./context/AuthContext";

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
							<Route
								path='/register/customer'
								element={<CustomerRegister />}
							/>
							<Route
								path='/register/store'
								element={<StoreRegister />}
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
