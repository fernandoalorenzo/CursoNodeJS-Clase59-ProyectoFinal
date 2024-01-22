import { useEffect } from "react";
import CardsList from "../components/cards/CardsList";
import { useNavigate } from "react-router-dom";

export default function Home() {

	const navigate = useNavigate();

	useEffect(() => {
		const user = localStorage.getItem("user");

		// Si no hay datos de usuario, redirige a la página de inicio de sesión
		if (!user) {
			navigate("/login");
		}
	}, [navigate]);
	
	return (
		<>
			<CardsList />
		</>
	);
}
