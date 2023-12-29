// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const CreateUsers = () => {
	const [titulo, setTitulo] = useState("");
	const [autor, setAutor] = useState("");
	const [genero, setGenero] = useState("");
	const [publicacion, setPublicacion] = useState("");
	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();

const handleGuardarUser = () => {
	const data = {
		titulo,
		autor,
		genero,
		publicacion
	};

	if (data.publicacion) {
		data.publicacion = data.publicacion.substring(0, 10);
	} else {
		data.publicacion = "";
	}

	fetch("http://localhost:5000/users", {
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
	.then(() => {
		enqueueSnackbar("Operación realizada exitosamente!", {
			variant: "success",
		});
		navigate("/");
	})
	.catch((error) => {
		enqueueSnackbar("Error", { variant: "error" });
		console.error("Error:", error);
	});
};

	return (
		<>
			<div className="container w-50">
				<div className="row">
					<h1 className="text-center">Agregar nuevo usuario</h1>
				</div>
				<div className="row g-2 my-3">
					<div className="col-6">
						<label className="form-label">
							Título
						</label>
						<input
							className="form-control"
							type="text"
							value={titulo}
							onChange={(e) => setTitulo(e.target.value)}
						/>
					</div>
					<div className="col-md-6">
						<label className="form-label">
							Autor
						</label>
						<input
							className="form-control"
							type="text"
							value={autor}
							onChange={(e) => setAutor(e.target.value)}
						/>
					</div>
				</div>
				<div className="row g-2 my-3">
					<div className="col-md-6">
						<label className="form-label">
							Género
						</label>
						<input
							className="form-control"
							type="text"
							value={genero}
							onChange={(e) => setGenero(e.target.value)}
						/>
					</div>
					<div className="col-6">
						<label className="form-label">
							Fecha de Publicación
						</label>
						<input
							className="form-control"
							type="date"
							value={publicacion}
							onChange={(e) => setPublicacion(e.target.value)}
						/>
					</div>
				</div>
				<div className="d-grid gap-2 d-md-flex justify-content-md-end">
					<button
						type="button"
						className="btn btn-primary"
						id="guardar"
						onClick={handleGuardarUser}>
						<i className="fa-regular fa-floppy-disk px-2"></i>
						Guardar
					</button>
					<button
						type="button"
						className="btn btn-danger"
						id="cancelar"
						onClick={() => navigate("/")}>
						<i className="fa-solid fa-ban px-2"></i>
						Cancelar
					</button>
				</div>
			</div>
		</>
	);
};

export default CreateUsers;
