import React, { useEffect } from 'react';
import closeBtn from './../images/Close-Icon.svg';

function PopupWithForm({ title, name, isOpen, onClose, children, onSubmit, buttonText }) {
	useEffect(() => {
		if (isOpen) {
			document.addEventListener('keydown', handleEscClose)
		}
		return () => {
			document.removeEventListener('keydown', handleEscClose)
		}
	}, [isOpen]);

	function handleEscClose(evt) {
		if (evt.key === 'Escape') {
			onClose();
		};
	};

	function mouseDownClose(evt) {
		if (evt.target.classList.contains('popup__container')) {
			onClose();
		};
	}

	return (
		<div className={`popup popup_form_${name} ${isOpen ? "popup_opened" : ""}`}
			onMouseDown={mouseDownClose}>
			<div className="popup__container">

				<form
					action="#"
					name={name}
					onSubmit={onSubmit}
					className={`form popup__content popup__content_form_${name}`}>
					<h3 className="popup__title">{title}</h3>
						{
							children
						}
					{
						<button
							type="submit"
							className="popup__save"
							name="button2">

							{buttonText || 'Сохранить'}

						</button>
					}
					<button className="popup__close" type="button" name="button1" aria-label="Закрыть">
						<img
							src={closeBtn}
							className="popup__image-close"
							alt="Закрыть окно"
							onClick={onClose}	/>
					</button>
				</form>
			</div>
		</div>
	)
}

export default PopupWithForm;