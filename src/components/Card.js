import React from 'react';
import garbageBtn from './../images/garbage.svg';
import likeBtn from './../images/favorite-black.svg';
import dislikeBtn from './../images/add-favorites.svg';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, id, onCardClick, onCardLike, onCardDeleteClick }) {	

	const currentUser = React.useContext(CurrentUserContext);
	const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);

	const handleClick = () => {
		onCardClick(card);
	}

	const handleLikeClick = ()=>{
    onCardLike(card);
  }

	const handleDeleteClick = ()=>{
    onCardDeleteClick(card);
  }

	
	return (
		<div className="gallery__card-body">
			{
			isOwn &&
			<img src={garbageBtn} className="gallery__delete" alt="Удалить"
			onClick={handleDeleteClick}
			/>
			}
			<img src={card.link} className="gallery__image gallery__image_source_card" alt={`Вид на ${card.name}`}
				onClick={handleClick}
			/>
			<figcaption className="gallery__description">
				<h2 className="gallery__name">{card.name}</h2>
				<div className="gallery__likes">
					<button className="gallery__button-favourites" type="button" name="button">
						<img 
						src={likeBtn} 
						className={isLiked ? "gallery__image-favourites-liked" : "gallery__image-favourites-liked  active"} 
						alt="Добавить в избранное"
						onClick={handleLikeClick} />
						
						<img src={dislikeBtn} className="gallery__image-favourites" alt="Добавить в избранное" />
					</button>
					<p className="gallery__likes-counter">{card.likes.length}</p>					
				</div>
			</figcaption>
		</div>
	)
}

export default Card;