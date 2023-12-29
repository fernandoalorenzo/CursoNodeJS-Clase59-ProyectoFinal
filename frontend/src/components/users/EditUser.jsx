/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const EditUser = () => {
	const [titulo, setTitulo] = useState("");
	const [autor, setAutor] = useState("");
	const [genero, setGenero] = useState("");
	const [publicacion, setPublicacion] = useState("");
	const navigate = useNavigate();
	const { id } = useParams();
	const { enqueueSnackbar } = useSnackbar();

	const fetchUsers = async () => {
		try {
			const response = await fetch(`http://localhost:5000/users/${id}`);
			if (!response.ok) {
				throw new Error("Ha ocurrido un error en la solicitud.");
			}
			const data = await response.json();
			setTitulo(data.titulo);
			setAutor(data.autor);
			setGenero(data.genero);
			if (data.publicacion) {
				data.publicacion =
					data.publicacion.substr(8, 2) +
					"/" +
					data.publicacion.substr(5, 2) +
					"/" +
					data.publicacion.substr(0, 4);
			} else {
				data.publicacion = "";
			}
			setPublicacion(data.publicacion);
		} catch (error) {
			alert("Ha ocurrido un error. Verifique la consola.");
			console.error(error);
		}
	};

	useEffect(() => {
		fetchUsers();
	}, [id]);

	const handleEditarUser = () => {
		const data = {
			titulo,
			autor,
			genero,
			publicacion,
		};

		if (data.publicacion) {
			const parts = data.publicacion.split("/");
			data.publicacion = parts[2] + "-" + parts[1] + "-" + parts[0];
		} else {
			data.publicacion = "";
		}

		fetch(`http://localhost:5000/users/${id}`, {
			method: "PUT",
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
				console.log(error);
			});
	};

	return (
		<div className="container w-50">
			<div className="row">
				<h1 className="text-center">Editar Usuario</h1>
			</div>
			<div className="row g-2 my-3">
				<div className="col-6">
					<label htmlFor="name" className="form-label">
						Titulo
					</label>
					<input
						className="form-control"
						name="Titulo"
						type="text"
						value={titulo}
						onChange={(e) => setTitulo(e.target.value)}
					/>
				</div>
				<div className="col-6">
					<label htmlFor="name" className="form-label">
						Autor
					</label>
					<input
						className="form-control"
						name="autor"
						type="text"
						value={autor}
						onChange={(e) => setAutor(e.target.value)}
					/>
				</div>
			</div>
			<div className="row g-3 my-3">
				<div className="col-6">
					<label htmlFor="name" className="form-label">
						Género
					</label>
					<input
						className="form-control"
						name="genero"
						type="text"
						value={genero}
						onChange={(e) => setGenero(e.target.value)}
					/>
				</div>
				<div className="col-6">
					<label htmlFor="name" className="form-label">
						Fecha de Publicación
					</label>
					<input
						className="form-control"
						name="publicacion"
						type="text"
						value={publicacion}
						onChange={(e) => setPublicacion(e.target.value)}
					/>
				</div>
			</div>
			<div className="d-grid gap-2 d-md-flex justify-content-md-end">
				<button className="btn btn-primary" onClick={handleEditarUser}>
					Guardar
				</button>
				<button
					type="button"
					className="btn btn-danger"
					onClick={() => navigate("/")}>
					<i className="fa-solid fa-ban px-2"></i>
					Cancelar
				</button>
			</div>
		</div>
	);
};

export default EditUser;
