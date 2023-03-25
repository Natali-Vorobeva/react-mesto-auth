import React, { useEffect } from 'react';
import closeBtn from './../images/Close-Icon.svg';

function ImagePopup({ card, onClose }) {

	useEffect(() => {
		if (Object.keys(card).length !== 0) {
			document.addEventListener('keydown', handleEscClose)
		}
		return () => {
			document.removeEventListener('keydown', handleEscClose)
		}
	}, [card])

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
		<div className={`popup popup_card_image ${Object.keys(card).length !== 0 ? "popup_opened" : ""}`}
		onClick={mouseDownClose}>
			<div className="popup__container">
				<figure className="popup__card-body">
					<button className="popup__close" type="button" name="button13" aria-label="Закрыть">
						<img id="card-close" src={closeBtn} className="popup__image-close" alt="Закрыть окно"
							onClick={onClose}
						/>
					</button>
					<img className="popup__show-image" src={card.link} alt={`Вид на ${card.name}`} />
					<figcaption>
						<h2 className="popup__description-name">{card.name}</h2>
					</figcaption>
				</figure>
			</div>
		</div>
	)
}

export default ImagePopup;