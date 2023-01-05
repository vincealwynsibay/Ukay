import React, { createContext, useReducer, useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const AuthContext = createContext(null);

interface Props {
	children: any;
}

interface IAuth {
	isAuthReady: boolean;
	user: any;
	token: any;
}

const initialState: IAuth = {
	isAuthReady: false,
	user: null,
	token: localStorage.getItem("token"),
};

export function authReducer(state: any, action: any) {
	switch (action.type) {
		case "READY_AUTH":
			return { ...state, isAuthReady: true, user: action.payload };
		case "LOGIN":
			localStorage.setItem("token", action.payload);
			return { ...state, token: action.payload };
		case "LOGOUT":
			return { ...state, user: null };
		default:
			return state;
	}
}

export function AuthContextProvider({ children }: Props) {
	const [state, dispatch] = useReducer(authReducer, initialState);

	let user: any = null;
	if (state.token) {
		user = useQuery(["user"], () => {
			return axios.get("http://localhost:5000/api/users/me", {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${state.token}`,
				},
			});
		});
	}

	useEffect(() => {
		dispatch({ type: "READY_AUTH", payload: user });
	}, []);

	console.log(state);

	return (
		<AuthContext.Provider value={{ ...state, dispatch }}>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuthContext = () => {
	const context = useContext(AuthContext);

	if (context === undefined) {
		throw new Error(
			"useAuthContext must be used within a AuthContextProvider"
		);
	}
	return context;
};
