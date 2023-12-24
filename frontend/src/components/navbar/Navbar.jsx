import { Link } from "react-router-dom";
import { Logo } from "../logo/logo";

export default function Navbar() {
	return (
		<nav className="navbar navbar-expand-lg fixed-top navbar-light navbar-custom bg-warning bg-gradient mb-4">
			<div className="container-fluid mb-3">
				<Logo alt="" className="d-inline-block align-text-top"></Logo>
				<span className="mx-3 logo-titulo">MeetMe.gram</span>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div
					className="collapse navbar-collapse justify-content-end mx-5"
					id="navbarSupportedContent">
					<ul className="navbar-nav me-5">
						<li className="nav-item menu-item mx-4">
							<Link className="nav-link " to="/">
								Inicio
							</Link>
						</li>
						<li className="nav-item menu-item mx-4">
							<Link className="nav-link" to="#">
								Perfil
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}
