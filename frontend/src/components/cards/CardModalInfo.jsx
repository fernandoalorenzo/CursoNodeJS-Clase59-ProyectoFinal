/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import CardModalInfoComentarios from "./CardModalInfoComments";

export default class Modal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			comentarios: [], // Estado para almacenar comentarios
		};
	}

	async componentDidMount() {
		// Aquí debes hacer una solicitud al servidor para obtener los comentarios asociados a la tarjeta
		// Asumo que hay un endpoint en tu servidor que devuelve los comentarios para una tarjeta específica
		try {
			const response = await fetch(
				`http://127.0.0.1:5000/posts/${this.props.cardId}/comments`
			);

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const data = await response.json();
			this.setState({ comentarios: data.comentarios });
		} catch (error) {
			console.error("Error al obtener comentarios: ", error);
		}
	}

	handleAddComentario = async (comment) => {
		// Agregar el nuevo comentario al estado
		const newComentario = {
			contenido: comentario,
			// Puedes agregar más propiedades como el usuario almacenado
		};
		this.setState((prevState) => ({
			comentarios: [...prevState.comentarios, newComentario],
		}));

		try {
		
		const response = await fetch(`http://127.0.0.1:5000/comments`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				_id: this.props._id,
				comentario: newComentario,
			}),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		// El comentario se ha guardado correctamente en el servidor
		console.log("Comentario guardado en el servidor");
	} catch (error) {
		console.error("Error al enviar el comentario al servidor: ", error);
	}

	};

	render() {
		let modalStyle = {
			display: "block",
			backgroundColor: "rgba(0, 0, 0, 0.8)",
		};

		return (
			<div
				className="modal show fade in"
				tabIndex="-1"
				style={modalStyle}>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">
								{this.props.titulo}{" "}
							</h5>
							<button
								type="button"
								className="btn-close"
								onClick={() => this.props.onClose()}></button>
						</div>
						<div className="modal-body">
							<img
								src={this.props.imagen}
								className="card-img-top card-img"
								alt={this.props.titulo}
							/>
							<p className="mt-3 text-start">
								{this.props.descripcion}
								{/* Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam dignissimos corrupti quisquam quidem quae saepe autem exercitationem officiis ea a, quo, qui quasi repudiandae perferendis? Delectus blanditiis quas id quod!
                                Veniam, quidem inventore perspiciatis repellendus iste officiis natus odit ipsum suscipit fuga, temporibus cumque sint. Neque nisi optio assumenda ullam explicabo delectus facilis facere, asperiores consectetur natus nemo excepturi amet?
                                Natus dolorum quas vero, a adipisci doloribus. Ratione a, doloremque, obcaecati quidem dignissimos omnis dicta distinctio animi nam voluptate doloribus repellat expedita ullam amet asperiores eum, unde labore tempora laborum? */}
							</p>
							<CardModalInfoComentarios
								comentarios={this.state.comentarios}
								onAddComentario={this.handleAddComentario}
							/>
						</div>
						<div className="modal-footer">
							{/* <button
								type="button"
								className="btn btn-secondary"
								data-bs-dismiss="modal"
								onClick={() => this.props.onClose()}>
								Cerrar
							</button> */}
							<button type="button" className="btn btn-primary">
								Guardar
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
