/* eslint-disable no-unused-vars */
import React from "react";

const Footer = () => {
	return (
		<footer className="bg-body-tertiary text-center text-lg-start align-items-center bg-primary bg-gradient">
			<p className="text-center">
				Copyright ©{new Date().getFullYear()}. All rights reserved.
				Powered by Fernando Lorenzo
			</p>
		</footer>
	);
};

export default Footer;
