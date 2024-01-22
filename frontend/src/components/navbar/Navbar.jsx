/* eslint-disable no-unused-vars */
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Logo } from "../logo/logo";

export default function Navbar() {
	const navigate = useNavigate();

	const user = JSON.parse(localStorage.getItem("user"));
	const userName = user ? user.nombre : null;

	const handleLogout = () => {
		// Elimina los datos del localStorage
		localStorage.removeItem("user");
		localStorage.removeItem("token");

		// Redirige al usuario a la página de inicio de sesión
		navigate("/login");
	};

	return (
		<nav className="navbar navbar-expand-lg fixed-top navbar-light bg-warning bg-gradient">
			<div className="container-fluid">
				<Link className="navbar-brand m-0" to="/">
					<Logo alt="logo" className="d-inline align-text-top"></Logo>
				</Link>
				<span className="logo-titulo">MeetMe.gram</span>
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
					className="collapse navbar-collapse justify-content-end"
					id="navbarSupportedContent">
					{userName && (
						<>
							<ul className="navbar-nav me-3">
								<li className="nav-item menu-item mx-4">
									<Link className="nav-link" to="#">
										Perfil
									</Link>
								</li>
							</ul>
							<div className="row text-center">
								<div className="hstack gap-3">
									<div className="vr me-3"></div>
									<div className="col align-self-start">
										<span className="nav-item">
											{userName}
										</span>
									</div>
									<div className="col align-self-start">
										<i
											className="btn fa-solid fa-power-off nav-item"
											title="Logout"
											onClick={handleLogout}></i>
									</div>
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		</nav>
	);
}
