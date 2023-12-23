/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import CardModalInfoComments from "./CardModalInfoComments";
import CardModalDelete from "./CardModalConfirmDelete";

export default function Modal(props) {
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
						<div className="card-header">
							<div className="row pt-2">
								<div className="col">
									<h5 className="card-title text-start">
										{props.titulo}
									</h5>
								</div>
								<div className="col-md-1 me-3 align-items-end">
									<i
										className="btn bg-danger fa-regular fa-trash-can"
										style={{ color: "#ffffff" }}
										onClick={handleDeleteClick}
										title="Eliminar posteo"></i>
								</div>
								<div className="col-md-1 me-3 align-items-end">
									<button
										type="button"
										className="btn-close end-0 tex-end"
										onClick={() =>
											props.onClose()
										}></button>
								</div>
							</div>
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

							<CardModalInfoComments postId={props._id} />
						</div>
					</div>
				</div>
			</div>
			{/* Modal de confirmación */}
			{cardModalDelete === true ? (
				<CardModalDelete
					onConfirm={handleDelete}
					onCancel={handleCancelDelete}
					tipoEliminacion={"posteo"}
				/>
			) : (
				""
			)}
		</>
	);
}
