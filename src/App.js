import React, { useEffect } from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import Login from "./Login";
import { auth, provider } from "./firebase";
import { login, logout } from "./features/userSlice";

function App() {
	const user = useSelector(selectUser);
	const dispatch = useDispatch();

	useEffect(() => {
		// some stuff
		auth.onAuthStateChanged((authuser) => {
			console.log("authuser is ", authuser);
			if (authuser) {
				dispatch(
					login({
						uid: authuser.uid,
						photo: authuser.photoURL,
						displayName: authuser.displayName,
						email: authuser.email,
					})
				);
			} else {
				dispatch(logout());
			}
		});
	}, [dispatch]);

	return (
		<div className="app">
			{user ? (
				<>
					<Sidebar />
					<Chat />
				</>
			) : (
				<Login />
			)}
		</div>
	);
}

export default App;
