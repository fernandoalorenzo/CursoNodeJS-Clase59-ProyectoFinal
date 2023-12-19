/* eslint-disable no-unused-vars */
// import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home"
// import PostsTable from "./components/pages/PostsTable";
import CardsList from "./components/cards/CardsList";
import "./styles/styles.css";

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				{/* <Route path="/PostsTable" element={<PostsTable />} /> */}
				<Route path="/CardsList" element={<CardsList />} />
				{/* <Route path="*" element={<NoDisponible />} /> */}
			</Routes>
		</Router>
	);
};

export default App;
