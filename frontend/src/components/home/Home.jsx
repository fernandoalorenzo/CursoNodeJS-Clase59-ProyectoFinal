/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "../../styles/styles.css";
import Menu from "../menu/Menu";
import Option from "../pages/Pagina";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import CardsList from "../cards/CardsList";

const App = () => {
	const [posts, setPosts] = useState([]);
	const [objectOption, setObjectOption] = useState({
	// 	header: "",
	// 	title: "",
	// content: "Contenido Home",
		content: ""
	});

	return (
		<>
			<div>
				<div className="row app-header sticky-top">
					<div className="col-12">
						<Header />
					</div>
				</div>
				<div className="row">
					<div className="col-3 nav sidebar d-flex justify-content-center">
						<table className="table table-borderless text-center align-items-center">
							<thead>
								<tr className="row mt-5">
									<td>
										<img
											className="logo-img"
											src="logo.png"
											alt="logo"
										/>
										<h4 className="logo-titulo text-center mt-2">
											MeetMe.gram
										</h4>
									</td>
								</tr>
							</thead>
							<tbody>
								<tr className="row mt-5">
									<td>
										<Menu
											setObjectOption={setObjectOption}
										/>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div className="col-9 content my-3">
						<div className="row">
							<CardsList />
						</div>
					</div>
				</div>
				<div className="row sticky-bottom mt-5">
					<div className="col-12">
						<Footer />
					</div>
				</div>
			</div>
		</>
	);
};

export default App;
