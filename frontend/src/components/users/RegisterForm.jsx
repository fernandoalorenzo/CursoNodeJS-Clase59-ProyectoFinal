/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastErrorGenerico, ToastOK } from "../toast/Toast.jsx";
import { ToastError } from "../toast/Toast.jsx";
import { Toaster } from "react-hot-toast";

const RegisterForm = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		nombre: "",
		apellido: "",
		rol: ""
	});

	const navigate = useNavigate();

	// DESACTIVAR EL SCROLL VERTICAL AL MONTAR EL COMPONENTE
	useEffect(() => {
		document.body.style.overflowY = "hidden";
		return () => {
			document.body.style.overflowY = "auto";
		};
	}, []);

	const onRegister = async (event) => {
		event.preventDefault();

		try {
			const response = await fetch("http://localhost:5000/users", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				setTimeout(() => {
					ToastOK("Usuario", "registrado");
					navigate("/login");
				}, 1000);
			} else {
				const data = await response.json();

				if (data.message === "El correo ya está registrado.") {
					ToastErrorGenerico(data.message);
				} else {
					ToastErrorGenerico(data.message || "Error en el registro.");
				}
			}
		} catch (error) {
			console.error("Error al registrar:", error);
			ToastError("Error en el registro. Inténtalo de nuevo más tarde.");
		}
	};

	const handleChange = (event) => {
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		});
	};

	return (
		<>
			<section className="vh-100 gradient-custom">
				<form onSubmit={onRegister}>
					<div className="container vh-100">
						<div className="row d-flex justify-content-center align-items-center">
							<div className="col-12 col-md-8 col-lg-6 col-xl-5">
								<div
									className="card bg-dark text-white mt-5"
									style={{ borderRadius: "1rem" }}>
									<div className="card-body p-4 text-center pb-0">
										<div className="mb-md-4">
											<h2 className="fw-bold mb-2 text-uppercase">
												Registro
											</h2>

											<div className="form-outline form-white mb-4">
												<input
													type="nombre"
													className="form-control form-control-lg"
													name="nombre"
													value={formData.nombre}
													onChange={handleChange}
													required
												/>
												<div className="row align-items-start">
													<label className="form-label text-start">
														Nombre
													</label>
												</div>
											</div>

											<div className="form-outline form-white mb-4">
												<input
													type="apellido"
													className="form-control form-control-lg"
													name="apellido"
													value={formData.apellido}
													onChange={handleChange}
												/>
												<div className="row align-items-start">
													<label className="form-label text-start">
														Apellido
													</label>
												</div>
											</div>

											<div className="form-outline form-white mb-4">
												<select
													className="form-select form-control-lg"
													name="rol"
													id="rol"
													value={formData.rol}
													onChange={handleChange}>
													<option value="">
														Elije un Rol
													</option>

													<option value="Usuario">
														Usuario
													</option>
													<option value="Administrador">
														Administrador
													</option>
												</select>
												<div className="row align-items-start">
													<label className="form-label text-start">
														Rol
													</label>
												</div>
											</div>

											<div className="form-outline form-white mb-4">
												<input
													type="email"
													className="form-control form-control-lg"
													name="email"
													value={formData.email}
													onChange={handleChange}
													required
												/>
												<div className="row align-items-start">
													<label className="form-label text-start">
														Email
													</label>
												</div>
											</div>

											<div className="form-outline form-white mb-4">
												<input
													type="password"
													className="form-control form-control-lg"
													name="password"
													value={formData.password}
													onChange={handleChange}
													required
												/>
												<div className="row align-items-start">
													<label className="form-label text-start">
														Contraseña
													</label>
												</div>
											</div>

											<button
												className="btn btn-outline-light btn-lg px-5"
												type="submit">
												Registrar
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</form>
			</section>
			<Toaster />
		</>
	);
};

export default RegisterForm;
