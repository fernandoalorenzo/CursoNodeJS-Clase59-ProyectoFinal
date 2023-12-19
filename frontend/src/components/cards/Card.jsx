/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
// import Modal from "./CardModalInfo";

const Card = ({ titulo, imagen, descripcion }) => {
	// const [modal, setModal] = useState(false);
	// const [post, setPost] = useState([]);

	// const getPost = (titulo, descripcion, imagen) => {
	// 	let post = [titulo, descripcion, imagen];
	// 	setPost( item => [1, ...post]);
	// 	// setPost(post);
	// 	return setModal(true);
	// }
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
						// onClick={getPost(
						// 	titulo,
						// 	descripcion,
						// 	imagen
						// )}
						>
						+ Info
					</button>
				</div>
			</div>
			{/* {
				modal === true ? <Modal /> : ""
			}
			<Modal /> */}
		</>
	);
};

export default Card;
