/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import CardModalDelete from "./CardModalConfirmDelete";

const CardModalInfoComments = ({ postId }) => {
	const [comentarios, setComentarios] = useState([]);
	const [editCommentId, setEditCommentId] = useState(null);
	const [deleteCommentId, setDeleteCommentId] = useState(null);

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

	// Desde aca, todo para editar el comentario
	const handleEdit = (commentId) => {
		setEditCommentId(commentId);
	};

	const handleSaveEdit = async (editedContent, commentId) => {
		try {
			const response = await fetch(
				`http://127.0.0.1:5000/comments/${postId}/${commentId}`,
				{
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ contenido: editedContent }),
				}
			);

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			// Actualiza lista de comentarios con el contenido editado
			const updatedResponse = await fetch(
				`http://127.0.0.1:5000/comments/${postId}`
			);
			if (!updatedResponse.ok) {
				throw new Error(
					`HTTP error! Status: ${updatedResponse.status}`
				);
			}
			const updatedData = await updatedResponse.json();
			setComentarios(updatedData.comentarios);

			// Oculta el formulario de edición
			setEditCommentId(null);
		} catch (error) {
			console.error(
				"Error al intentar guardar la edición del comentario: ",
				error
			);
		}
	};

	const handleEditContentChange = (commentId, e) => {
		const editedComentarios = comentarios.map((comentario) => {
			if (comentario._id === commentId) {
				return { ...comentario, contenido: e.target.value };
			}
			return comentario;
		});
		setComentarios(editedComentarios);
	};

	const handleCancelEdit = () => {
		setEditCommentId(null);
	};

	// Desde aca, todo para eliminar el comentario
	const handleConfirmDelete = async () => {
		try {
			// Hacer una solicitud DELETE a tu API para eliminar el comentario
			const response = await fetch(
				`http://127.0.0.1:5000/comments/${postId}/${deleteCommentId}`,
				{
					method: "DELETE",
				}
			);

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			// Actualizar la lista de comentarios después de la eliminación
			const updatedResponse = await fetch(
				`http://127.0.0.1:5000/comments/${postId}`
			);
			if (!updatedResponse.ok) {
				throw new Error(
					`HTTP error! Status: ${updatedResponse.status}`
				);
			}
			const updatedData = await updatedResponse.json();
			setComentarios(updatedData.comentarios);

			// Ocultar el modal de eliminación
			handleHideDeleteModal();
		} catch (error) {
			console.error("Error al intentar eliminar el comentario: ", error);
		}
	};

	// Muestra el modal para confirmar la eliminación del comentario
	const handleShowDeleteModal = (commentId) => {
		setDeleteCommentId(commentId);
	};

	// Ocultar el modal para confirmar la eliminación del comentario
	const handleHideDeleteModal = () => {
		setDeleteCommentId(null);
	};

	return (
		<>
			{comentarios.length === 0 ? (
				""
			) : (
				<h5 className="card-title text-start">
					Comentarios ({comentarios.length})
				</h5>
			)}

			{comentarios.map((comentario) => (
				<div className="card mb-5" key={comentario._id}>
					{editCommentId === comentario._id ? (
						<div className="card-body">
							<textarea
								rows="3"
								value={comentario.contenido}
								className="form-control mb-2"
								onChange={(e) =>
									handleEditContentChange(comentario._id, e)
								}></textarea>
							<button
								className="btn btn-sm btn-success me-2"
								onClick={() =>
									handleSaveEdit(
										comentario.contenido,
										comentario._id
									)
								}
								disabled={!comentario.contenido.trim()} // Deshabilitar si el contenido está vacío
							>
								Guardar
							</button>
							<button
								className="btn btn-sm btn-secondary"
								onClick={handleCancelEdit}>
								Cancelar
							</button>
						</div>
					) : (
						<>
							<div className="card-header text-start p-1">
								<b className="text-success">
									{comentario.usuario}
								</b>{" "}
								comentó:
							</div>
							<div className="card-body text-start p-2 fs-6 fst-italic">
								{comentario.contenido}
							</div>
							<div className="card-footer d-flex justify-content-end p-1">
								<button
									className="btn btn-sm btn-primary me-2"
									onClick={() => handleEdit(comentario._id)}
									title="Editar comentario">
									<i className="fa-solid fa-pencil"></i>
								</button>
								<button
									className="btn btn-sm btn-danger"
									onClick={() =>
										handleShowDeleteModal(comentario._id)
									}
									title="Eliminar comentario">
									<i className="fa-regular fa-trash-can"></i>
								</button>
							</div>
						</>
					)}
				</div>
			))}
			{deleteCommentId && (
				<CardModalDelete
					onCancel={handleHideDeleteModal}
					onConfirm={handleConfirmDelete}
					tipoEliminacion="comentario"
				/>
			)}
		</>
	);
};

export default CardModalInfoComments;
