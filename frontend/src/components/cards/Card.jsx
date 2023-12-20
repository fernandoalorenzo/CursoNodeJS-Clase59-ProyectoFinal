/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Modal from "./CardModalInfo";

const Card = ({ titulo, imagen, descripcion }) => {
	const [modal, setModal] = useState(false);
	// const [post, setPost] = useState([]);
	const [tempData, setTempData] = useState([]);

	return (
		<>
			<div className="card">
				<img
					src={imagen}
					className="card-img-top card-img"
					alt={titulo}
				/>
				<div className="card-body">
					<h5 className="card-title">{titulo}</h5>
					<p className="card-text">{descripcion}</p>
					<button
						className="btn btn-primary"
						onClick={() => setModal(true)}>
						+ Info
					</button>
				</div>
			</div>
			{modal === true ? (
				<Modal
					titulo={titulo}
					descripcion={descripcion}
					imagen={imagen}
					onClose={() => setModal(false)}
				/>
			) : (
				""
			)}
		</>
	);
};

export default Card;
