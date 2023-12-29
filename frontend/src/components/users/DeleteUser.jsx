// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const DeleteUser = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const { enqueueSnackbar } = useSnackbar();

	const handleDeleteUser = () => {
		fetch(`http://localhost:5000/users/${id}`, {
			method: "DELETE",
		})
		.then((response) => {
			if (!response.ok) {
				throw new Error(
					`Error ${response.status}: ${response.statusText}`
				);
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
			console.error(error);
		});
	};
	
	return (
		<>
			<div className="container w-50">
				<div className="row">
					<h1 className="text-center">Eliminar Usuario</h1>
				</div>
				<div className="card text-start">
					<div className="card-body">
						<h2 className="card-title text-center">Está seguro?</h2>
						<div className="row g-2 my-3 d-flex justify-content-center">
							<div className="col-md-6">
								<button
									className="btn btn-danger w-100"
									onClick={handleDeleteUser}>
									<i className="fa-regular fa-trash-can"></i>{" "}
									Sí
								</button>
							</div>
							<div className="col-md-6">
								<button
									className="btn btn-secondary w-100"
									onClick={() => navigate("/")}>
									<i className="fa-solid fa-ban px-2"></i> No
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default DeleteUser;
