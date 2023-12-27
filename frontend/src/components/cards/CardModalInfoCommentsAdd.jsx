/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const CardModalAdd = ({ onSave, onCancel }) => {
	const [usuario, setUsuario] = useState("");
	const [comentario, setComentario] = useState("");
	const [isGuardarDisabled, setGuardarDisabled] = useState(true);

	const handleInputChange = (e) => {
    const { name, value } = e.target;

	// Actualizar el estado según el campo que cambió
	if (name === "usuario") {
		setUsuario(value);
	} else if (name === "comentario") {
		setComentario(value);
	}

	console.log("usuario: ", usuario);
	console.log("comentario: ", comentario);

	console.log("value.trim: ", value.trim());
	console.log("comentario.trim: ", comentario.trim());
	console.log("usuario.trim: ", usuario.trim());
	};

	useEffect(() => {
		// Verificar si ambos campos están llenos después de que los estados se han actualizado
		setGuardarDisabled(
			usuario.trim() === "" || comentario.trim() === ""
		);
	}, [usuario, comentario]);
	
	const handleSave = () => {
		// Validar que ambos campos estén llenos
		if (usuario.trim() === "" || comentario.trim() === "") {
			alert("Por favor, complete ambos campos.");
			return;
		}

		// Llamar a la función onSave pasando los datos del nuevo comentario
		onSave({ usuario, comentario });

		// Limpiar los campos y cerrar el modal
		setUsuario("");
		setComentario("");
		setGuardarDisabled(true);
	};

	return (
		<div
			className="modal fade show"
			tabIndex="-1"
			role="dialog"
			style={{ display: "block" }}>
			<div className="modal-dialog modal-dialog-centered" role="document">
				<div className="modal-content">
					<div className="modal-header bg-primary text-white">
						<h5 className="modal-title">Agregar Comentario</h5>
						<button
							type="button"
							className="btn-close"
							onClick={onCancel}></button>
					</div>
					<div className="modal-body">
						<div className="mb-3">
							<label className="form-label">Usuario</label>
							<input
								type="text"
								className="form-control"
								name="usuario"
								value={usuario}
								onInput={handleInputChange}
							/>
						</div>
						<div className="mb-3">
							<label className="form-label">Comentario</label>
							<textarea
								rows="3"
								className="form-control"
								name="comentario"
								value={comentario}
								onInput={handleInputChange}></textarea>
						</div>
					</div>
					<div className="modal-footer">
						<button
							type="button"
							className="btn btn-primary"
							onClick={handleSave}
							disabled={isGuardarDisabled}>
							Guardar
						</button>
						<button
							type="button"
							className="btn btn-secondary"
							data-dismiss="modal"
							onClick={onCancel}>
							Cancelar
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

// CardModalAdd.propTypes = {
// 	onSave: PropTypes.func.isRequired,
// 	onCancel: PropTypes.func.isRequired,
// };

export default CardModalAdd;
