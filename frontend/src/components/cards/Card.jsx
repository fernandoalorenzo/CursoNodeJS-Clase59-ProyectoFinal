/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import ModalInfo from "./CardModalInfo";

const Card = ({ titulo, imagen, descripcion, _id , fetchData }) => {
	const [modalInfo, setModalInfo] = useState(false);

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
					<p className="card-text text-start">{descripcion}</p>
					<div className="d-flex justify-content-end">
						<button
							className="btn btn-info justify-self-end"
							onClick={() => setModalInfo(true)}>
							<i className="fa-solid fa-circle-info fa-fade fa-lg"></i>
						</button>
					</div>
				</div>
			</div>
			{modalInfo === true ? (
				<ModalInfo
					_id={_id}
					titulo={titulo}
					descripcion={descripcion}
					imagen={imagen}
					onClose={() => setModalInfo(false)}
					fetchData={fetchData}
				/>
			) : (
				""
			)}
		</>
	);
};

export default Card;
