import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/Api.js';
import * as auth from '../auth.js';

import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmCardDeletionPopup from './ConfirmCardDeletionPopup';
import InfoTooltip from './InfoTooltip';

function App() {
	const [currentUser, setCurrentUser] = useState({
		"name": '',
		"about": '',
		"avatar": '',
		"_id": '',
		"cohort": ''
	});
	const navigate = useNavigate();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
	const [isEditPersonalPopupOpen, setIsEditPersonalPopupOpen] = useState(false);
	const [isAddNewCard, setIsAddNewCard] = useState(false);
	const [selectedCard, setSelectedCard] = useState({});
	const [isImagePopupOpened, setIsImagePopupOpened] = useState(false);
	const [cards, setCards] = useState([]);
	const [isConfirmationCardDeletionPopupOpened, setConfirmationCardDeletionPopupOpened] = useState({
		isOpen: false, card: {}
	});
	const [email, setEmail] = React.useState('');
	const [isVisibilityBurger, setIsVisibilityBurger] = useState(true);
	const [isOpenInfoTooltip, setOpenInfoTooltip] = useState(false);
	const [success, setSuccess] = useState({
		status: false,
		text: ''
	});

	function handleLogin(values) {
		const { email, password } = values;
		auth
			.authorize(email, password)
			.then((res) => {
				if (res.token) {
					localStorage.setItem('token', res.token);
					setIsLoggedIn(true);
					navigate('/', { replace: true });
					
					setEmail(email);
				}
			})
			.catch((res) => {
				if (res === 'Ошибка: 401') {
					setSuccess({
						status: false,
						text: "Аккаунт не\u00A0зарегистрирован",
					});
				} else {
					setSuccess({
						status: false,
						text: res,
					});
				}
				setOpenInfoTooltip(true);
			})
	}

	function handleRegister(email, password) {
		auth.register(email, password)
			.then(data => {
				setIsVisibilityBurger(false);
				if (data) {
					setSuccess({
						status: true,
						text: "Вы успешно зарегистрировались!",
					});
					navigate('/sign-in', { replace: true })
					return;
				}
			})
			.catch(() => {
				setSuccess({
					status: false,
					text: "Что-то пошло не так! Попробуйте ещё раз.",
				});
			})
			.finally(() => {
				setOpenInfoTooltip(true);
			})
	}

	useEffect(() => {
		handleToken();
	}, []);

	function handleToken() {
		const token = localStorage.getItem('token');
		if (token) {
			auth
				.checkToken(token)
				.then((res) => {
					setIsLoggedIn(true);
					setEmail(res.data.email);
					navigate('/', { replace: true })
				})
				.catch(err => {
					console.log(err);
				})
		}
	};

	useEffect(() => {
		if (isLoggedIn) {
			Promise.all([
				api.getUserInfo(),
				api.getInitialCards()
			])
				.then(([me, cards]) => {
					setCurrentUser(me);
					setCards(cards);
					setIsVisibilityBurger(true);
				})
				.catch((err) => {
					console.log(err);
				})
		}
	}, [isLoggedIn]);

	function handleAddNewCard(data) {
		api.addCard(data)
			.then(newCard => {
				setCards([newCard, ...cards]);
				closeAllPopups();
			})
			.catch(err => {
				console.log(err.status);
				alert(`Ошибка добавления карточки:\n ${err.status}\n ${err.text}`);
			});
	}

	function handleCardLike(card) {
		const isLiked = card.likes.some(i => i._id === currentUser._id);

		api.changeLikeCardStatus(card._id, !isLiked)
			.then((newCard) => {
				setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
			})
			.catch((err) => {
				console.log(`Ошибка: ${err}`);
			});
	};

	function handleCardDelete(card) {
		api.deleteCard(card._id)
			.then((res) => {
				setCards(cards.filter(c => c._id !== card._id));
				closeAllPopups()
			})
			.catch((err) => {
				console.log(`Ошибка: ${err}`);
				alert(`Ошибка удаления карточки:\n ${err.status}\n ${err.text}`);
			});
	}

	function handleUpdateAvatar(avatar) {
		api.changeUserAvatar(avatar)
			.then((updatedUser) => {
				setCurrentUser(updatedUser);
				closeAllPopups();
			})
			.catch((err) => {
				console.log(`Ошибка: ${err}`);
			});
	}

	const handleUpdateUser = (data) => {
		api.editUserInfo(data)
			.then(updatedUser => {
				setCurrentUser(updatedUser);
				closeAllPopups();
			})
			.catch(err => {
				console.log(`Ошибка: ${err}`);
			});
	}

	function handleEditAvatarClick() {
		setIsEditAvatarPopupOpen(true);
	}

	function handleEditPersonalClick() {
		setIsEditPersonalPopupOpen(true);
	}

	function handleAddNewCardClick() {
		setIsAddNewCard(true);
	}

	function handleCardClick(card) {
		setSelectedCard(card);
		setIsImagePopupOpened(true);
	}

	function handleOpenConfirmationCardDeletionPopup(card) {
		setConfirmationCardDeletionPopupOpened({
			isOpen: true, card: card
		});
	}

	function closeAllPopups() {
		setIsEditAvatarPopupOpen(false);
		setIsEditPersonalPopupOpen(false);
		setIsAddNewCard(false);
		setConfirmationCardDeletionPopupOpened({
			isOpen: false, card: {}
		});
		setIsImagePopupOpened(false);
		setOpenInfoTooltip(false);
	};

	useEffect(() => {
		if (!isImagePopupOpened) {
			setTimeout(() => setSelectedCard({}), 200);
		};
	}, [isImagePopupOpened]);

	function handleSignOut() {
		localStorage.removeItem('token');
		setIsVisibilityBurger(true);
		navigate('/sign-in', { replace: true });
		setIsLoggedIn(false);
		setEmail('');
	}

	return (
		<div className="page__content">
			<CurrentUserContext.Provider value={currentUser}>
				<Routes>
					<Route
						exact
						path='/sign-up'
						element={
							<Register onRegister={handleRegister} />
						}
					/>
					<Route
						exact
						path='/sign-in'
						element={
							<Login
								onLogin={handleLogin}
							/>
						}
					/>
					<Route
						path="/"
						element={
							<ProtectedRoute
								component={Main}
								cards={cards}
								onEditAvatar={handleEditAvatarClick}
								onEditPersonalData={handleEditPersonalClick}
								onAddNewCard={handleAddNewCardClick}
								onCardClick={handleCardClick}
								onCardLike={handleCardLike}
								onCardDeleteClick={handleOpenConfirmationCardDeletionPopup}
								email={email}
								onSignOut={handleSignOut}
								isVisibilityBurger={isVisibilityBurger}
								isLoggedIn={isLoggedIn}
							/>
						}
					/>
					<Route
						path='*'
						element={
							<Navigate to='/' />}
					/>
				</Routes>
				<ConfirmCardDeletionPopup
					onClose={closeAllPopups}
					card={isConfirmationCardDeletionPopupOpened.card}
					isOpen={isConfirmationCardDeletionPopupOpened.isOpen}
					onCardDelete={handleCardDelete}
				/>
				<EditProfilePopup
					isOpen={isEditPersonalPopupOpen}
					onClose={closeAllPopups}
					onUpdateUser={handleUpdateUser}
				/>

				<AddPlacePopup
					isOpen={isAddNewCard}
					onClose={closeAllPopups}
					onAddPlace={handleAddNewCard}
				/>

				<EditAvatarPopup
					isOpen={isEditAvatarPopupOpen}
					onClose={closeAllPopups}
					onUpdateAvatar={handleUpdateAvatar}
				/>

				<ImagePopup card={selectedCard} isImagePopupOpened={isImagePopupOpened} onClose={closeAllPopups} />

				<InfoTooltip isOpen={isOpenInfoTooltip} onClose={closeAllPopups} success={success} />

			</CurrentUserContext.Provider>
			<Footer />
		</div >
	)
};

export default App;
