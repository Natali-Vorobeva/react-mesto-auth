import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import headerLogo from '../../src/images/logo.svg';

function Header({ onSignOut, email, registration, enter, exit }) {	
		const navigate = useNavigate();
		function signOut(){
			localStorage.removeItem('token');
			navigate.push('/sign-in');
		}
	return (
		<header className="header">
			<img src={headerLogo} className="header__logo" alt="Логотип" />
			<div className="header__authorization">
				<p className="header__authorization-email">{email}</p>
				<Link className="header__authorization-link" to='/sign-in'>{enter}</Link>
				<Link className="header__authorization-link" to='/sign-up'>{registration}</Link>
				<Link className="header__authorization-link" to='/sign-in' onClick={signOut}>
					{exit}	
				</Link>
			</div>
		</header>
	)
}
export default Header;