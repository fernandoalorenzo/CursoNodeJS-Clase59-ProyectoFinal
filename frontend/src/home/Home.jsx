import { useState } from "react";
import "../../src/App.css";
import Menu from "../menu/Menu";
import Option from "../menu/Pagina";
import Header from "../header/Header";
import Footer from "../footer/Footer";

const App = () => {
	const [objectOption, setObjectOption] = useState({
		header: "Encabezado Home",
		title: "Titulo Home",
		content: "Contenido Home",
	});
	return (
		<div>
			<div className="row app-header">
				<div className="col-12">
					<Header />
				</div>
			</div>
			<div className="row app-menu">
				<div className="col-3 nav sidebar d-flex justify-content-center">
					<table className="table table-borderless text-center align-items-center">
						<tr className="row mt-5">
							<td>
								<img
									className="logo-img"
									src="../../public/logo.png"
									alt="logo"
								/>
								<h4 className="logo-titulo text-center mt-2">MeetMe.gram</h4>
							</td>
						</tr>
						<tr className="row mt-5">
							<td>
								<Menu setObjectOption={setObjectOption} />
							</td>
						</tr>
						<tr></tr>
						<tr></tr>
					</table>
				</div>
				<div className="col-9 content">
					<Option
						header={objectOption.header}
						title={objectOption.title}
						content={objectOption.content}
					/>
				</div>
			</div>
			<div className="row app-footer">
				<div className="col-12">
					<Footer />
				</div>
			</div>
		</div>
	);
};

export default App;
