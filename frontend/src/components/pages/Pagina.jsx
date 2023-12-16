/* eslint-disable react/prop-types */
const Pagina = (props) => {
	return (
		<div className="card border-primary">
			<div className="card-header bg-primary text-white">
				<h3>{props.header}</h3>
			</div>
			<div className="card-body">
				<div className="card-title">
					<h4>{props.title}</h4>
				</div>
				<div className="card-text">
					<p className="texto">{props.content}</p>
				</div>
			</div>
		</div>
	);
};

export default Pagina;