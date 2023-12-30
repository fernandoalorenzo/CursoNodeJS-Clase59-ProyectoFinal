/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { ToastOK } from "../toast/Toast";

const UserModalForm = (props) => {
	const [nombre, setNombre] = useState("");
	const [apellido, setApellido] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [rol, setRol] = useState("");

	useEffect(() => {
		if (props.userData) {
			setNombre(props.userData.nombre ?? "");
			setApellido(props.userData.apellido ?? "");
			setEmail(props.userData.email ?? "");
			setPassword(props.userData.password ?? "");
			setRol(props.userData.rol ?? "");
		}
	}, [props.userData]);

	const handleGuardarUsuario = async () => {
		const data = {
			nombre,
			apellido,
			email,
			password,
			rol,
		};

		console.log(data);
		console.log("isEdit:", props.isEdit);

		try {
			const response = await fetch(
				`http://127.0.0.1:5000/users${
					props.userData ? `/${props.userId || ""}` : ""
				}`,
				{
					method: props.userData ? "PUT" : "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(data),
				}
			);

			if (!response.ok) {
				throw new Error("Hubo un error en la petición.");
			}

			// CIERRA EL MODAL DESPUÉS DE GUARDAR
			props.onClose();

			// MUESTRA NOTIFICACIÓN
			ToastOK("Usuario", `${props.userData ? "editado" : "agregado"}`);
		} catch (error) {
			console.error("Error:", error);
		}
	};

	const modalStyle = {
		display: "block",
		backgroundColor: "rgba(0, 0, 0, 0.8)",
	};

	return (
		<>
			<div
				className="modal show fade in"
				tabIndex="-1"
				style={modalStyle}>
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<div className="modal-header bg-warning">
							<h5 className="modal-title">
								{props.userData ? "Editar" : "Agregar"} usuario
							</h5>
							<button
								type="button"
								className="btn-close"
								onClick={props.onClose}></button>
						</div>
						<div className="d-grid modal-body ">
							<label className="form-label text-start">
								Nombre
							</label>
							<input
								className="form-control"
								type="text"
								value={nombre}
								onChange={(e) => setNombre(e.target.value)}
							/>
							<label className="form-label text-start mt-4">
								Apellido
							</label>
							<input
								className="form-control"
								type="text"
								value={apellido}
								onChange={(e) => setApellido(e.target.value)}
							/>
							<label className="form-label text-start mt-4">
								Email
							</label>
							<input
								className="form-control"
								type="text"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>

							<label className="form-label text-start mt-4">
								Password
							</label>
							<input
								className="form-control"
								type="text"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>

							<label className="form-label text-start mt-4">
								Rol
							</label>
							<select
								className="form-select"
								name="rol"
								id="rol"
								value={rol}
								onChange={(e) => setRol(e.target.value)}>
								{!rol && <option value="">Elije un Rol</option>}
								<option value="Usuario">Usuario</option>
								<option value="Administrador">
									Administrador
								</option>
							</select>
						</div>
						<div className="modal-footer">
							<div className="d-grid gap-2 d-md-flex justify-content-md-end">
								<button
									type="button"
									className="btn btn-primary"
									id="guardar"
									onClick={handleGuardarUsuario}
									disabled={
										!nombre ||
										!apellido ||
										!email ||
										!rol ||
										!password
									}>
									<i className="fa-regular fa-floppy-disk px-2"></i>
									Guardar
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Toaster />
		</>
	);
};

export default UserModalForm;
