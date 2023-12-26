/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../hooks/UseForm";

const LoginForm = () => {
	const {nombre, apellido, email, password, onInputChange, onResetForm } = useForm({
		email: "",
		password: "",
		nombre: "",
		apellido: "",
	});

	const navigate = useNavigate();

	const onLogin = (e) => {
		e.preventDefault();

		navigate("/", {
			replace: true,
			state: {
				logger: true,
				nombre,
				apellido
			}
		});
		onResetForm();
	};


	return (
		<>
			<section className="vh-100 gradient-custom">
				<form onSubmit={onLogin}>
					<div className="container vh-100">
						<div className="row d-flex justify-content-center align-items-center pt-5">
							<div className="col-12 col-md-8 col-lg-6 col-xl-5">
								<div
									className="card bg-dark text-white"
									style={{ borderRadius: "1rem" }}>
									<div className="card-body p-4 text-center p-0">
										<div className="mb-md-4">
											<h2 className="fw-bold mb-2 text-uppercase">
												Login
											</h2>
											<p className="text-white-50 mb-5">
												Ingrese su e-mail y contraseña
											</p>

											<div className="form-outline form-white mb-4">
												<input
													type="email"
													className="form-control form-control-lg"
													name="email"
													value={email}
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
													name="password"
													value={password}
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
												Login
											</button>
										</div>

										<div>
											<p className="mb-0">
												No tiene una cuenta?{" "}
												<a
													href="#!"
													className="text-white-50 fw-bold">
													Registrarse
												</a>
											</p>
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

export default LoginForm;
