/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import CardModalInfoComments from "./CardModalInfoComments";
import CardModalDelete from "./CardModalConfirmDelete";

export default function Modal(props) {
	const [modalInfo, setModalInfo] = useState(false);
	const [cardModalDelete, setCardModalDelete] = useState(false);

	const handleDeleteClick = () => {
		setCardModalDelete(true);
	};

	const handleDelete = async () => {
		try {
			await fetch(`http://127.0.0.1:5000/posts/${props._id}`, {
				method: "DELETE",
			});

			setCardModalDelete(false);

			props.onClose();
			
			props.fetchData();
		} catch (error) {
			console.error("Error al intentar eliminar el posteo: ", error);
		}
	};

	const handleCancelDelete = () => {
		// Cierra el modal de confirmación
		setCardModalDelete(false);
	};

	let modalStyle = {
		display: "block",
		backgroundColor: "rgba(0, 0, 0, 0.8)",
	};

	return (
		<>
			<div
				className="modal show fade in"
				tabIndex="-1"
				style={modalStyle}>
				<div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">{props.titulo} </h5>
							<button
								type="button"
								className="btn-close"
								onClick={() => props.onClose()}></button>
						</div>
						<div className="modal-body">
							<img
								src={props.imagen}
								className="card-img-top card-img-modal-info"
								alt={props.titulo}
							/>
							<p className="mt-3 text-start">
								{props.descripcion}
							</p>

							{/* COMENTARIOS */}
							<CardModalInfoComments postId={props._id} />
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn end-0"
								onClick={handleDeleteClick}>
								<i
									className="fa-solid fa-trash-can"
									style={{ color: "#ff0000" }}></i>
							</button>{" "}
						</div>
					</div>
				</div>
			</div>
			{/* Modal de confirmación */}
			{cardModalDelete === true ? (
				<CardModalDelete
					onConfirm={handleDelete}
					onCancel={handleCancelDelete}
				/>
			) : (
				""
			)}
		</>
	);
}
