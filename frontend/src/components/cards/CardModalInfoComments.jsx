/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";

const CardModalInfoComments = ({ postId }) => {
	const [comentarios, setComentarios] = useState([]);

	useEffect(() => {
		const fetchComentarios = async () => {
			try {
				const response = await fetch(
					`http://127.0.0.1:5000/comments/${postId}`
				);
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				const data = await response.json();
				setComentarios(data.comentarios);
			} catch (error) {
				console.error("Error al intentar obtener comentarios: ", error);
			}
		};

		fetchComentarios();
	}, [postId]);

	return (
		<>
			{comentarios.length === 0 ? (
				""
			) : (
				<h5 className="card-title text-start">Comentarios ({comentarios.length})</h5>	
			)} 
			{comentarios.map((comentario) => (
				<div className="card mb-3" key={comentario._id}>
					<div className="card-header text-start p-2">
						<b className="text-success">{comentario.usuario}</b>{" "}
						comentó:
					</div>
					<div className="card-body text-start p-2 fs-6 fst-italic">
						{comentario.contenido}
					</div>
				</div>
			))}
		</>
	);
};

export default CardModalInfoComments;
