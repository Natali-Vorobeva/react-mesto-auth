import React, { useState } from 'react';
import Header from './Header';
import '../index.css';

function Login({onLogin}) {

	const [ values, setValues ] = useState({});
	
	const handleChange = (evt) => {
    const {value, name} = evt.target;
    setValues({...values, [name]: value });    
  };	

	function handleSubmit(evt) {
		evt.preventDefault();		
		onLogin(values);
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
							value={values.email  || ''}
							onChange={handleChange}
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
							value={values.password  || ''}
							onChange={handleChange}

						/>
						<span className="password-input-error login__input-error"></span>
						<button className="login__button" type="submit">Войти</button>						
					</div>
				</form>
			</div>
		</>
	)
}

export default Login;