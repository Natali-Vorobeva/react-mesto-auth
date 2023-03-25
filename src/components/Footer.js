import React from 'react';
function Footer() {
	return (
		<footer className="footer">
				<p className="footer__copyright">© 2022-
				{new Date().getFullYear()}&nbsp;
				Mesto-react Russia</p>
			</footer>
	)
}
export default Footer;