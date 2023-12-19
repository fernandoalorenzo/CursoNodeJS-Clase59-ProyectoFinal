/* eslint-disable no-unused-vars */
import React, { Component } from "react";

export default class Modal extends Component {
	render() {
		let modalStyle = {
			display:  "block",
			backgroundColor: "rgba(0, 0, 0, 0.5)",
		};

		return (
			<div className="modal show fade in" style={modalStyle} role="dialog">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="class-header">
							<h5 className="modal-title"> TITULO </h5>
							<button
								type="button"
								className="btn-close"></button>
                        </div>
                        <div className="modal-body">
                            <p>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Quisquam nisi officiis, a
                                dignissimos labore animi ex dolor.
                                Laboriosam iste aperiam, nulla animi ipsum,
                                at expedita ipsam corporis deleniti facilis
                                dolorum? Repudiandae est, perspiciatis
                                doloremque rerum exercitationem alias velit
                                excepturi cumque cupiditate quia voluptatem
                                deleniti fuga saepe esse iure tenetur
                                maxime. Provident nisi aliquam minus eius
                                repellendus fugit quia sapiente accusantium.
                                Temporibus quod maxime est fuga, numquam
                                esse corporis praesentium facilis dolorem
                                incidunt, repellendus quasi illo. Nisi
                                similique libero adipisci, molestiae soluta
                                quibusdam ab. Dolor voluptatum similique
                                provident aliquam! Quasi, eos. Officia vero
                                deleniti dicta saepe sit ipsam adipisci,
                                quasi nisi totam ipsum assumenda ullam
                                delectus amet eveniet incidunt, eum
                                reiciendis aliquam. Quas, quibusdam soluta
                                id exercitationem iure tenetur debitis quis.
                            </p>
                        </div>
					</div>
                </div>
            </div>
		);
	}
}
