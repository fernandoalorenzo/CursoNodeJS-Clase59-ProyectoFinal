/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import CardsList from "./CardsList";

export default class Modal extends Component {
	render() {
		let modalStyle = {
			display:  "block",
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
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam dignissimos corrupti quisquam quidem quae saepe autem exercitationem officiis ea a, quo, qui quasi repudiandae perferendis? Delectus blanditiis quas id quod!
                                Veniam, quidem inventore perspiciatis repellendus iste officiis natus odit ipsum suscipit fuga, temporibus cumque sint. Neque nisi optio assumenda ullam explicabo delectus facilis facere, asperiores consectetur natus nemo excepturi amet?
                                Natus dolorum quas vero, a adipisci doloribus. Ratione a, doloremque, obcaecati quidem dignissimos omnis dicta distinctio animi nam voluptate doloribus repellat expedita ullam amet asperiores eum, unde labore tempora laborum?
							</p>
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-secondary"
								data-bs-dismiss="modal"
								onClick={() => this.props.onClose()}>
								Cerrar
							</button>
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
