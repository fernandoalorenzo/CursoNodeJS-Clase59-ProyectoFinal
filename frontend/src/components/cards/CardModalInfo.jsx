/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import CardModalInfoComments from "./CardModalInfoComments";
import CardModalDelete from "./CardModalConfirmDelete";

export default function Modal(props) {
	const [cardModalDelete, setCardModalDelete] = useState(false);

	const [isEditing, setIsEditing] = useState(false);
	const [editedTitle, setEditedTitle] = useState(props.titulo);
	const [editedDescription, setEditedDescription] = useState(
		props.descripcion
	);

	const [editedImage, setEditedImage] = useState(props.imagen);

	const [imagenUrl, setImagenUrl] = useState("");

	const handleImagenUrlChange = (event) => {
		setImagenUrl(event.target.value);
	};

	const handleEditClick = () => {
		setIsEditing(!isEditing);
	};

	const handleDeleteClick = () => {
		setCardModalDelete(true);
	};

	const handleSaveClick = async () => {
		try {
			const response = await fetch(
				`http://127.0.0.1:5000/posts/${props._id}`,
				{
					method: "PUT", // O el método HTTP adecuado para la actualización en tu API
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						titulo: editedTitle,
						descripcion: editedDescription,
						imagen: editedImage,
					}),
				}
			);

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			setIsEditing(false);

			props.fetchData();
		} catch (error) {
			console.error(
				"Error al intentar guardar las modificaciones: ",
				error
			);
		}
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

	const handleCancelEdit = () => {
		setIsEditing(false);
		setEditedTitle(props.titulo);
		setEditedDescription(props.descripcion);
		setEditedImage(props.imagen);
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
									{!isEditing ? (
										<h5 className="card-title text-start">
											{props.titulo}
										</h5>
									) : (
										<h5 className="card-title text-start">
											Editar Posteo
										</h5>
									)}
								</div>
								{!isEditing && (
									<>
										<div className="col-md-1 me-3 align-items-end">
											<i
												className="btn bg-primary fa-regular fa-edit"
												style={{ color: "#ffffff" }}
												onClick={handleEditClick}
												title="Editar posteo"></i>
										</div>
										<div className="col-md-1 me-3 align-items-end">
											<i
												className="btn bg-danger fa-regular fa-trash-can"
												style={{ color: "#ffffff" }}
												onClick={handleDeleteClick}
												title="Eliminar posteo"></i>
										</div>
									</>
								)}
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
						{isEditing && (
							<div className="modal-body">
								<div className="form-group mb-4">
									<div className="row align-items-start">
										<label className="col-auto form-label">
											Título
										</label>
									</div>
									<input
										className="form-control"
										type="text"
										value={editedTitle}
										onChange={(e) =>
											setEditedTitle(e.target.value)
										}
									/>
								</div>
								<div className="form-group mb-4">
									<div className="row align-items-start">
										<label className="col-auto form-label">
											Descripción
										</label>
									</div>
									<textarea
										style={{ height: "8rem" }}
										className="form-control"
										value={editedDescription}
										onChange={(e) =>
											setEditedDescription(e.target.value)
										}
									/>
								</div>
								<div className="form-group mb-4">
									<div className="row align-items-start">
										<label className="col-auto form-label">
											Imagen
										</label>
									</div>
									<input
										className="form-control"
										type="text"
										value={editedImage}
										onChange={(e) =>
											setEditedImage(e.target.value)
										}
									/>
								</div>
								<div
									className="card mt-3 bottom-0 start-50 translate-middle-x"
									style={{ width: "12rem" }}>
									<div className="card-header p-1">
										<p className="p-0 m-0 fw-bold">
											Vista Previa
										</p>
									</div>
									<div className="card-body p-0">
										{editedImage.length === 0 && (
											<img
												className="card-img-top p-5"
												src="noimage.png"
												alt="Imagen"
											/>
										)}
										{editedImage && (
											<img
												className="card-img-top"
												src={editedImage}
												alt="Imagen"
											/>
										)}
									</div>
								</div>
								<div className="modal-footer mt-4">
									<div className="d-grid gap-2 d-md-flex justify-content-md-end">
										<button
											type="button"
											className="btn btn-secondary"
											onClick={handleCancelEdit}>
											Cancelar
										</button>
										<button
											type="button"
											className="btn btn-primary"
											onClick={handleSaveClick}
											// DESHABILITA SI TITULO, DESCRIPCION O IMAGEN ESTAN VACIOS
											disabled={
												!editedDescription.trim() ||
												!editedImage.trim() ||
												!editedTitle.trim()
											}>
											Guardar
										</button>
									</div>
								</div>
							</div>
						)}
						{!isEditing && (
							<div className="modal-body">
								<p className="mt-3 text-start">
									{props.descripcion}
								</p>
								<img
									src={props.imagen}
									className="card-img-top card-img-modal-info mb-3"
									alt={props.titulo}
								/>
								<CardModalInfoComments postId={props._id} />
							</div>
						)}
					</div>
				</div>
			</div>
			{/* Modal de confirmación */}
			{cardModalDelete === true ? (
				<CardModalDelete
					onConfirm={() => {
						handleDelete();
						setCardModalDelete(false);
					}}
					onCancel={() => setCardModalDelete(false)}
					tipoEliminacion={"posteo"}
				/>
			) : (
				""
			)}
		</>
	);
}
