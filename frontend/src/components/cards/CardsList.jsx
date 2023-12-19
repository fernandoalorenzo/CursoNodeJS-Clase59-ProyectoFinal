/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Card from "./Card.jsx";

const CardsList = (posts) => {
	const [data, setData] = useState([]);
	const [selectedCard, setSelectedCard] = useState(null);
	const [modalVisible, setModalVisible] = useState(false);

	const fetchData = async () => {
		try {
			const response = await fetch("http://127.0.0.1:5000/posts");
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			const data = await response.json();
			// console.log(data.data);
			setData(data.data);
		} catch (error) {
			console.error("Error al intentar obtener datos: ", error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleInfoClick = (card) => {
		console.log("Info de la tarjeta:", card);
		console.log("Modal visible antes:", modalVisible);
		setSelectedCard(card);
		setModalVisible(true);
		console.log("Modal visible despues:", modalVisible);
	};

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
									onInfoClick={() => handleInfoClick(card)}
								/>
							</div>
						</div>
					))}

					{/* Modal de Bootstrap para mostrar información detallada */}
					{selectedCard && (
						<div
							className={`modal ${modalVisible ? "show" : ""}`}
							tabIndex="-1"
							role="dialog">
							<div className="modal-dialog" role="document">
								<div className="modal-content">
									<div className="modal-header">
										<h5 className="modal-title">
											{selectedCard.titulo}
										</h5>
										<button
											type="button"
											className="close"
											aria-label="Close"
											onClick={() => {
												setSelectedCard(null);
												setModalVisible(false);
											}}>
											<span aria-hidden="true">
												&times;
											</span>
										</button>
									</div>
									<div className="modal-body">
										<img
											src={selectedCard.imagen}
											className="img-fluid"
											alt={selectedCard.titulo}
										/>
										<p>{selectedCard.descripcion}</p>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default CardsList;
