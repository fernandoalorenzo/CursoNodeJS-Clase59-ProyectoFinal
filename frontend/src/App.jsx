/* eslint-disable no-unused-vars */
// import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/pages/Home"
import Footer from "./components/footer/Footer";
import LoginForm from "./components/login/LoginForm";
import "./styles/styles.css";

const App = () => {
	return (
		<BrowserRouter>
			<Navbar />
				<Routes>
				<Route path="/" element={<Home />} />
					<Route path="/login" element={<LoginForm />} />
					{/* <Route path="/CardsList" element={<CardsList />} /> */}
					{/* <Route path="*" element={<NoDisponible />} /> */}
				</Routes>
			<Footer />
		</BrowserRouter>
	);
};

export default App;
