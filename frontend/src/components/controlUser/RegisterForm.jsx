/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../hooks/UseForm";

const RegisterForm = () => {
	const { nombre, apellido, email, password, onInputChange, onResetForm } = useForm({
		nombre: "",
		apellido: "",
		email: "",
		password: "",
	});

	const navigate = useNavigate();

	const onRegister = (e) => {
		e.preventDefault();

		navigate("/", {
			replace: true,
			state: {
				logger: true,
				nombre,
				apellido,
			},
		});
		onResetForm();
	}

	// DESACTIVAR EL SCROLL VERTICAL AL MONTAR EL COMPONENTE
	useEffect(() => {
		document.body.style.overflowY = "hidden";
		return () => {
			document.body.style.overflowY = "auto";
		};
	}, []);

	return (
		<>
			<section className="vh-100 gradient-custom">
				<form onSubmit={onRegister}>
					<div className="container vh-100">
						<div className="row d-flex justify-content-center align-items-center pt-5">
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
													value={nombre}
													onChange={onInputChange}
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
													value={apellido}
													onChange={onInputChange}
												/>
												<div className="row align-items-start">
													<label className="form-label text-start">
														Apellido
													</label>
												</div>
											</div>

											<div className="form-outline form-white mb-4">
												<input
													type="email"
													className="form-control form-control-lg"
													value={email}
													name="email"
													onChange={onInputChange}
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
													value={password}
													name="password"
													onChange={onInputChange}
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
		</>
	);
};

export default RegisterForm;
