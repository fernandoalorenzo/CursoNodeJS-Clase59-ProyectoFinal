/* eslint-disable no-unused-vars */
import React, { useState } from "react";

const LoginForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch(
				"http://localhost:your_port/api/users/login",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ email, password }),
				}
			);

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message);
			}

			const data = await response.json();
			console.log(data);
			// Aquí puedes manejar la lógica de almacenamiento en localStorage si es necesario
		} catch (error) {
			console.error(error.message);
		}
	};

	return (
		<>
			<section className="vh-100 gradient-custom">
				<div className="container py-5 h-90">
					<div className="row d-flex justify-content-center align-items-center h-100">
						<div className="col-12 col-md-8 col-lg-6 col-xl-5">
							<div
								className="card bg-dark text-white"
								style={{borderRadius: "1rem"}}>
								<div className="card-body p-5 text-center">
									<div className="mb-md-5 mt-md-4 pb-5">
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
											/>
											<label
												className="form-label">
												Email
											</label>
										</div>

										<div className="form-outline form-white mb-4">
											<input
												type="password"
												className="form-control form-control-lg"
											/>
											<label
												className="form-label">
												Contraseña
											</label>
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
			</section>
			{/*
			<form onSubmit={handleLogin}>
				<div className="mb-3">
					<label htmlFor="email" className="form-label">
						Email
					</label>
					<input
						type="email"
						className="form-control"
						id="email"
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="password" className="form-label">
						Contraseña
					</label>
					<input
						type="password"
						className="form-control"
						id="password"
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<button type="submit" className="btn btn-primary">
					Iniciar sesión
				</button>
			</form> */}
		</>
	);
};

export default LoginForm;
