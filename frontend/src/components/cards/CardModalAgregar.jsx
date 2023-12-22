/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";

const ModalAgregar = (props) => {
	const [titulo, setTitulo] = useState("");
	const [descripcion, setDescripcion] = useState("");
	const [imagen, setImagen] = useState("");
	const [imagenUrl, setImagenUrl] = useState("");

	const handleImagenUrlChange = (event) => {
		setImagenUrl(event.target.value);
	};
	
	const handleGuardarPost = () => {
		const data = {
			titulo,
			descripcion,
			imagen
		};

		fetch("http://localhost:5000/posts", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
		.then((response) => {
			if (!response.ok) {
				throw new Error("Hubo un error en la petición.");
			}
			return response.json();
		})
		// .then(() => {
			// enqueueSnackbar("Operación realizada exitosamente!", {
			// 	variant: "success",
			// });
			// navigate("/");
		// })
		.catch((error) => {
			// enqueueSnackbar("Error", { variant: "error" });
			console.error("Error:", error);
		});
		// CIERRA EL MODAL DESPUES DE GUARDAR
		// props.onClose();
	};

	let modalStyle = {
		display:  "block",
		backgroundColor: "rgba(0, 0, 0, 0.8)",
	};

	return (
		<div className="modal show fade in" tabIndex="-1" style={modalStyle}>
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Agregar Post</h5>
						<button
							type="button"
							className="btn-close"
							onClick={props.onClose}></button>
					</div>
					<div className="d-grid modal-body">
						<label className="form-label text-start">Título</label>
						<input
							className="form-control"
							type="text"
							value={titulo}
							onChange={(e) => setTitulo(e.target.value)}
						/>
						<label className="form-label text-start mt-4">
							Descripción
						</label>
						<input
							className="form-control"
							type="text"
							value={descripcion}
							onChange={(e) => setDescripcion(e.target.value)}
						/>
						<label className="form-label text-start mt-4">
							URL de Imagen
						</label>
						<input
							className="form-control"
							type="text"
							value={imagenUrl}
							onChange={handleImagenUrlChange}
						/>

						{imagenUrl && <img src={imagenUrl} alt="Imagen" />}
						
					</div>
					<div className="modal-footer">
						<div className="d-grid gap-2 d-md-flex justify-content-md-end">
							<button
								type="button"
								className="btn btn-primary"
								id="guardar"
								onClick={handleGuardarPost}>
								<i className="fa-regular fa-floppy-disk px-2"></i>
								Guardar
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ModalAgregar;