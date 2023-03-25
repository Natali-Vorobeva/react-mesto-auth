import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as auth from '../auth.js';
// import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from './Header';
import '../index.css';

function Login({ onLogin }) {

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	//---ОБРАБОТЧИКИ---
	function handleChangeEmail(evt) {
		setEmail(evt.target.value);
	}

	function handleChangePassword(evt) {
		setPassword(evt.target.value);
	}

	function handleSubmit(evt) {
		evt.preventDefault();
		if (!email || !password) {
			return;
		}
		onLogin(password, email);
	}

	return (
		<>
			<Header
				registration={"Регистрация"}
			/>
			<div className="login">
				<h2 className="login__title">Вход</h2>
				<form
					onSubmit={handleSubmit}
					className="login__form">
					<div className="login__input-container">
						<input
							id="email"
							name="email"
							type="email"
							placeholder="Email"
							className="login__input"
							minLength="2"
							maxLength="40"
							required
							value={email}
							onChange={handleChangeEmail}
						/>
						<span className="email-input-error login__input-error"></span>
						<input
							id="password"
							type="password"
							name="password"
							placeholder="Пароль "
							className="login__input"
							required
							minLength="4"
							maxLength="10"
							autoComplete='off'
							value={password}
							onChange={handleChangePassword}

						/>
						<span className="password-input-error login__input-error"></span>
						<button className="login__button" type="submit">Войти</button>
						{/* <Link to="/register" className="register__login-link">Войти</Link> */}
					</div>
				</form>
			</div>
		</>
	)
}

export default Login;