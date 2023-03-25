import React from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmCardDeletionPopup({ card, onCardDelete, ...commonProps } ) {

	function handleSubmit(evt) {		
    evt.preventDefault();
		  onCardDelete(card);
  };

	return (
		<PopupWithForm
					name={'delete-place'}
					title={"Вы уверены?"}
					buttonText="Да"					
					onSubmit={handleSubmit}		
					{...commonProps}		
				/>				
	)
}

export default ConfirmCardDeletionPopup;