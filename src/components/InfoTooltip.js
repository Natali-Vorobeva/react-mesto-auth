import React from 'react';
import incorrectly from '../../src/images/incorrectly.png';
import correctly from '../../src/images/correctly.png';

export default function InfoTooltip({ name, isOpen, successfully }) {

	function handleSubmit(evt) {
		evt.preventDefault();
	};

	return (
		<div className={`popup popup_form_${name} ${isOpen ? "popup_opened" : ""}`}
			onMouseDown={mouseDownClose}>
			<div className="popup__container">
				<div className="popup__body">
					{successfully
						?
						<>
							<div className="popup__correctly">
								<img src={correctly} alt="Вы зарегистрированы" />
							</div>
							<p className="popup__registration popup__registration_type_active">Вы успешно зарегистрировались</p>
							</>	
						:
						<>
							<div class="popup__incorrectly">
								<img src={incorrectly} alt="Что-то пошло не так!" />
							</div>
							<p className="popup__registration popup__registration_type_not-active">Что-то пошло не так!</p>
							<p className="popup__registration popup__registration_type_not-active">Попробуйте ещё раз.</p>
						</>
					}
				</div>
			</div>
		</div>
	)
}