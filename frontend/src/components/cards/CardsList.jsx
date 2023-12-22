/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Card from "./Card.jsx";

const CardsList = (posts) => {
	const [data, setData] = useState([]);
	const [modal, setModal] = useState(false);

	const fetchData = async () => {
		try {
			const response = await fetch("http://127.0.0.1:5000/posts");
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			const data = await response.json();
			console.log(data.data);
			setData(data.data);
			return setModal(true);
		} catch (error) {
			console.error("Error al intentar obtener datos: ", error);
		}
		
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			<div className="container">
				<div className="row justify-content-center row-cols-auto">
					{data.map((card) => (
						<div
							className="m-4 mx-3"
							key={card._id}
							style={{ width: "18rem" }}>
							<div className="card">
								<Card
									titulo={card.titulo}
									descripcion={card.descripcion}
									imagen={card.imagen}
									onInfoClick={() => setModal(true)}
								/>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default CardsList;
