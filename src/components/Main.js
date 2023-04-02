import React, { useState } from 'react';
import editButton from './../images/edit-button.png';
import editBtn from './../images/Edit-Button.svg';
import addBtn from './../images/add-button.svg';

import Header from './Header';
import Card from "./Card";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
	
	const [isHovered, setIsHovered] = useState('overlay-hover');
	const currentUser = React.useContext(CurrentUserContext);
	function toggleHover() {
		if (isHovered) {
			setIsHovered('');
		} else {
			setIsHovered('overlay-hover');
		}
	}	

	return (
		<>
			<Header
				isVisibilityBurger={props.isVisibilityBurger}
				onSignOut={props.onSignOut}
				exit={"Выйти"}
				email={props.email}
			/>
			<main className="main" >
				<section className="personal-page">
					<div className="personal-page__title">
						<div className="personal-page__avatar-container"
							onMouseEnter={toggleHover}
							onMouseLeave={toggleHover}>
							<div className={`personal-page__avatar-container-overlay  ${isHovered} `}
							>
								<img src={editButton} className="personal-page__edit-overlay"
									alt="Редактировать аватарку" />
							</div>
							<div className="personal-page__avatar-container-avatar">
								<img src={currentUser.avatar} className="personal-page__avatar" alt="Здесь должна быть аватарка"
									onClick={props.onEditAvatar} />
							</div>
						</div>
						<div className="personal-page__data">
							<div className="personal-page__account">
								<h1 className="personal-page__username">{currentUser.name}</h1>
								<button className="personal-page__edit popup-open" type="button" name="button1">
									<img src={editBtn}
										onClick={props.onEditPersonalData}
										className="personal-page__open"
										alt="Редактировать профиль" />

								</button>
							</div>
							<p className="personal-page__about">{currentUser.about}</p>
						</div>
					</div>
					<button className="personal-page__button popup-open" type="button" name="button2" onClick={props.onAddNewCard}>
						<img src={addBtn} className="personal-page__image-button" alt="Добавить" />
					</button>
				</section>
				<section className="gallery">
					{
						props.cards.map((card) => {
							return <Card
								key={card._id}
								card={card}
								onCardClick={props.onCardClick}
								onCardLike={props.onCardLike}
								onCardDeleteClick={props.onCardDeleteClick}
							/>
						})
					}
				</section>
			</main >
		</>
	)
}

export default Main;