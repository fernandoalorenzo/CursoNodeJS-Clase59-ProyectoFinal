/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const PostsTable = ({ posts }) => {
	return (
		<>
			<table className="table table-hover table-sm table-borderless align-middle text-center">
				<thead className="table-dark">
					<tr>
						<th scope="col">Nº</th>
						<th scope="col">Título</th>
						<th scope="col">Descripción</th>
						<th scope="col">Imágen</th>
						<th scope="col">Acciones</th>
					</tr>
				</thead>
				<tbody>
					{posts.map((post, index) => (
						<tr key={post._id}>
							<td className="text-start align-middle text-center col-lg-1">
								{index + 1}
							</td>
							<td className="text-start col-lg-3">
								{post.titulo}
							</td>
							<td className="text-start col-lg-3">
								{post.descripcion}
							</td>
							<td className="text-start col-lg-2">
								{post.imagen}
							</td>
							<td>
								<Link
									className="btn btn-warning mx-2"
									to={`/posts/edit/${post._id}`}>
									<i className="fa-regular fa-pen-to-square"></i>
								</Link>
								<Link
									className="btn btn-danger mx-2"
									to={`/posts/delete/${post._id}`}>
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

export default PostsTable;
