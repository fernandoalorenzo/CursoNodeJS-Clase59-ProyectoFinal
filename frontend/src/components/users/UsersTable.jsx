/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Users from "../../pages/Users";

export const UsersTable = ({ Users }) => {
	return (
		<>
			<table className="table table-hover table-sm table-borderless align-middle text-center">
				<thead className="table-dark">
					<tr>
						<th scope="col">Nº</th>
						<th scope="col">Nombre</th>
						<th scope="col">Apellido</th>
						<th scope="col">Email</th>
						<th scope="col">Rol</th>
						<th scope="col">Acciones</th>
					</tr>
				</thead>
				<tbody>
					{Users.map((user, index) => (
						<tr key={user._id}>
							<td className="text-start align-middle text-center col-lg-1">
								{index + 1}
							</td>
							<td className="text-start col-lg-3">
								{user.nombre}
							</td>
							<td className="text-start col-lg-3">
								{user.apellido}
							</td>
							<td className="text-start col-lg-2">
								{user.email}
							</td>
							<td className="align-middle text-center col-lg-1">
								{user.rol}
							</td>
							<td>
								<Link
									className="btn btn-warning mx-2"
									to={`/users/edit/${user._id}`}>
									<i className="fa-regular fa-pen-to-square"></i>
								</Link>
								<Link
									className="btn btn-danger mx-2"
									to={`/users/delete/${user._id}`}>
									<i className="fa-regular fa-trash-can"></i>
								</Link>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};
