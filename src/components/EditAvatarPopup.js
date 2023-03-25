import React from 'react';
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {	
	
	const avatarLink = React.useRef();

  function handleSubmit(evt) {
		evt.preventDefault();
		onUpdateAvatar(
			avatarLink.current.value
		);	
	}
	
	return (
		<PopupWithForm
				name={'avatar'}
				title={"Обновить аватар?"}
				isOpen={isOpen}
				onClose={onClose}
				onSubmit = {handleSubmit}
				buttonText = "Сохранить"
			>
				<div className="popup__input-container">
					<input ref={avatarLink} type="url" id="avatar-image-input" placeholder="Ссылка на изображение"
						className="popup__input popup__input_data_avatar" name="link" required />
					<span className="avatar-image-input-error popup__input-error"></span>
				</div>
			</PopupWithForm>
	)
}

