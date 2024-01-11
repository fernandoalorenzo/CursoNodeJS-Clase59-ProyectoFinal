/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserModalForm from "./UserModalForm";
import ModalDelete from "./../delete/ModalConfirmDelete";
import { Toaster } from "react-hot-toast";
import { ToastOK } from "../toast/Toast";

export const UsersTable = ({ users }) => {
	const [data, setData] = useState([]);
	const [userModalForm, setUserModalForm] = useState(false);
	const [modalDelete, setModalDelete] = useState(false);

	const [selectedUser, setSelectedUser] = useState(null);

	const openUserModalForm = () => {
		setSelectedUser(null);
		setUserModalForm(true);
	};

	const closeUserModalForm = async () => {
		setUserModalForm(false);
		await fetchData();
	};

	const handleEditClick = (user) => {
		setSelectedUser(user);
		setUserModalForm(true);
	};

	const handleDeleteClick = (user) => {
		setSelectedUser(user);
		setModalDelete(true);
	};

	const handleDelete = async (userId) => {
		if (!selectedUser) {
			return;
		}
		try {
			await fetch(`http://127.0.0.1:5000/users/${selectedUser._id}`, {
				method: "DELETE",
			});

			setModalDelete(false);

			// Muestra notificacion
			ToastOK("Usuario", "eliminado");

			fetchData();
		} catch (error) {
			console.error("Error al intentar eliminar el usuario: ", error);
		}
	};

	const fetchData = async () => {
		try {
			const response = await fetch("http://127.0.0.1:5000/users");
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			const data = await response.json();
			setData(data);
		} catch (error) {
			console.error("Error al intentar obtener datos: ", error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			<div className="container w-75">
				<div className="row justify-content-center">
					<div className="row row-cols-auto justify-content-end m-0 px-0 py-3">
						<button
							className="btn btn-primary align-self-end"
							onClick={openUserModalForm}>
							Nuevo Usuario
						</button>
					</div>
				</div>
				<div className="row">
					<table className="table table-hover align-middle text-center">
						<thead className="table-primary">
							<tr>
								<th scope="col" className="text-start">
									Nombre
								</th>
								<th scope="col" className="text-start">
									Apellido
								</th>
								<th scope="col" className="text-start">
									Email
								</th>
								<th scope="col" className="text-start">
									Rol
								</th>
								<th scope="col">Acciones</th>
							</tr>
						</thead>
						<tbody>
							{data.map((user, index) => (
								<tr key={user._id}>
									<td className="text-start col-lg-3">
										{user.nombre}
									</td>
									<td className="text-start col-lg-3">
										{user.apellido}
									</td>
									<td className="text-start col-lg-2">
										{user.email}
									</td>
									<td className="text-start col-lg-1">
										{user.rol}
									</td>
									<td>
										<button
											className="btn btn-warning mx-2"
											onClick={() =>
												handleEditClick(user)
											}>
											<i className="fa-regular fa-pen-to-square fa-lg"></i>
										</button>

										<button
											className="btn btn-danger mx-2"
											onClick={() =>
												handleDeleteClick(user)
											}>
											<i className="fa-regular fa-trash-can fa-lg"></i>
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
			{userModalForm === true ? (
				<UserModalForm
					onClose={closeUserModalForm}
					onSave={fetchData}
					isEdit={false}
					userId={selectedUser ? selectedUser._id : null}
					userData={selectedUser}
				/>
			) : (
				""
			)}
			{modalDelete === true ? (
				<ModalDelete
					onConfirm={() => {
						handleDelete(data._id);
						setModalDelete(false);
					}}
					onCancel={() => setModalDelete(false)}
					tipoEliminacion={"usuario"}
				/>
			) : (
				""
			)}
			<Toaster />
		</>
	);
};
