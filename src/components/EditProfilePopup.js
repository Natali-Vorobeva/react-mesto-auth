import React, { useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from "./PopupWithForm";

export default function EditProfilePopup({ isOpen, onClose, loading, onUpdateUser }) {

	const currentUser = React.useContext(CurrentUserContext);

	const [name, setName] = useState('');
	const [about, setAbout] = useState('');

	function handleChangeName(evt) {
    setName(evt.target.value);
  }

	function handleChangeAbout(evt) {
    setAbout(evt.target.value);
  }

	function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name,
      about: about,
    });
  }

	useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser, isOpen]);

	return (
		<PopupWithForm
					name={'personal'}
					title={"Редактировать профиль"}
					isOpen={isOpen}
					onClose={onClose}
					loading={loading}
					onSubmit={handleSubmit}
				>
					<div className="popup__input-container">
						<input type="text" id="username-input" placeholder="Имя" 
						className="popup__input popup__input_data_name"
							name="name" minLength="2" maxLength="40" required 
							value={name}
							onChange={handleChangeName}/>
						<span className="username-input-error popup__input-error"></span>
						<input type="text" id="about-input" placeholder="Вид деятельности"
							className="popup__input popup__input_data_about" 
							name="about" minLength="2" maxLength="200" required 
							value={about}
							onChange={handleChangeAbout}
							/>
						<span className="about-input-error popup__input-error"></span>
					</div>

				</PopupWithForm>
	)
}