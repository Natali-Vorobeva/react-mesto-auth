import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import headerLogo from '../../src/images/logo.svg';
import closeBtn from './../images/Close-Icon.svg';

function Header({ isVisibilityBurger, onSignOut, email, registration, enter, exit }) {

	const [visibilityMenu, setVisibilityMenu] = useState('inactive-header-menu');
	const [visibilityLogoSection, setVisibilityLogoSection] = useState('');

	function handleClickBurger() {
		setVisibilityMenu('');
		setVisibilityLogoSection('inactive-header-menu');
	}

	function handleClickCloseBtn() {
		setVisibilityMenu('inactive-header-menu');
		setVisibilityLogoSection('');
	}

	return (
		<>
			<header className={`header header-type-info ${visibilityMenu}`}>
				<div className="header__info">
					<p className="header__user-email">{email}</p>
					<Link className="header__exit" to='/sign-in' onClick={onSignOut}>
						{exit}
					</Link>
				</div>
				<div className="header__close-info">
					<img src={headerLogo} className="header__logo" alt="Логотип" />
					<div className="header__close-btn" type="button" name="button1" aria-label="Закрыть">
						<img
							src={closeBtn}
							onClick={handleClickCloseBtn}
							className="header__image-close"
							alt="Закрыть окно"
						/>
					</div>
				</div>
			</header>

			<header className={`header ${visibilityLogoSection}`}>
				<img src={headerLogo} className="header__logo" alt="Логотип" />
				<div className="header__authorization">
					<p className="header__authorization-email">{email}</p>
					<Link className="header__authorization-link" to='/sign-in'>{enter}</Link>
					
					<Link className="header__authorization-link" to='/sign-in' onClick={onSignOut}>
						{exit}
					</Link>

				</div>
				{
					isVisibilityBurger 
					?
						<div className="header__burger" 
							onClick={handleClickBurger}
						>
							<div className="header__menu-burger">
								<span className="header__element-burger">
								</span>
							</div>
						</div>
						:
						<Link className="header__link-registration" to='/sign-up'>{registration}</Link>
				}

			</header>
		</>
	)
}
export default Header;