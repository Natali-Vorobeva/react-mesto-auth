import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import '../index.css';

function Register({ onRegister }) {	
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	
	function handleChangeEmail(evt) {
		setEmail(evt.target.value);
	}

	function handleChangePassword(evt) {
		setPassword(evt.target.value);
	}

	function handleSubmit(evt) {
		evt.preventDefault();
		onRegister(email, password);
	}

	return (
		<>
			<Header
				enter={"Войти"}
			/>
			<section className="register" >
				<h2 className="register__title">Регистрация</h2>
				<form
					onSubmit={handleSubmit}
					className="register__form">
					<div className="register__input-container">
						<input
							id="email"
							name="email"
							type="email"
							placeholder="Email"
							className="register__input register__input_data_email"
							value={email}
							onChange={handleChangeEmail}
							required
							autoComplete='off'
						/>
						<input
							id="password"
							type="password"
							name="password"
							placeholder="Пароль "
							className="register__input register__input_data_password"
							value={password}
							onChange={handleChangePassword}
							required
							autoComplete='off'
						/>
						<button className="register__button" type="submit">
							Зарегистрироваться
						</button>
						<div className="register__sign-in">
							<p>Уже зарегистрированы? <Link className='register__sign-in-link' to='/sign-in'>Войти</Link></p>
						</div>
					</div>
				</form>
			</section >
		</>
	)
}

export default Register;
