import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
	const [name, setName] = useState('');
  const [link, setLink] = useState('');

	const handleNameChange = (evt) => {
    setName(evt.target.value);
  }
  const handleLinkChange = (evt) => {
    setLink(evt.target.value);
  }
  function handleAddPlaceSubmit(evt) {
    evt.preventDefault();
    onAddPlace({ name, link} );		
  }
	
  React.useEffect(() => {
    if (!isOpen) {
      setName('');
      setLink('');
    }
  }, [isOpen])

	return(
		<PopupWithForm
					name={'place'}
					title={"Новое место"}
					buttonText="Создать"
					isOpen={isOpen}
					onClose={onClose}
					onSubmit={handleAddPlaceSubmit}
				>
					<div className="popup__input-container">
						<input 
							type="text" 
							id="name-card-input" 
							placeholder="Название" 
							className="popup__input popup__input_name_card"
							minLength="2" 
							maxLength="30" 
							required 
							onChange={handleNameChange}
							value={name}
							/>
						<span className="name-card-input-error popup__input-error"></span>
						<input type="url" id="link-image-input" 
							value={link} 
							placeholder="Ссылка на картинку"
							className="popup__input popup__input_address_image" 
							name="link" 
							required 
							onChange={handleLinkChange}
							/>
						<span className="link-image-input-error popup__input-error"></span>
					</div>
				</PopupWithForm>
	)
}