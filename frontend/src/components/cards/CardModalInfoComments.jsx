import React, { useState } from "react";

const CardModalInfoComentarios = ({ comentarios, onAddComentario }) => {
	const [newComentario, setNewComentario] = useState("");

	const handleAddComentario = () => {
		if (newComentario.trim() !== "") {
			onAddComentario(newComentario);
			setNewComentario("");
		}
	};

	return (
		<div className="mt-3">
			<h6>Comentarios:</h6>
			<ul className="list-group">
				{comentarios.map((comentario, index) => (
					<li key={index} className="list-group-item">
						{comentario.contenido}
					</li>
				))}
			</ul>
			<div className="mt-3">
				<textarea
					className="form-control"
					rows="3"
					value={newComentario}
					onChange={(e) => setNewComentario(e.target.value)}></textarea>
				<button
					className="btn btn-primary mt-2"
					onClick={handleAddComentario}>
					Agregar Comentario
				</button>
			</div>
		</div>
	);
};

export default CardModalInfoComentarios;
