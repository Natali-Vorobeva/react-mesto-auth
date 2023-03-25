import React, { useEffect, useState, useCallback } from 'react';
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

function App() {
	const [currentUser, setCurrentUser] = useState({
		"name": '',
		"about": '',
		"avatar": '',
		"_id": '',
		"cohort": ''
	});

	const navigate = useNavigate();

	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
	const [isEditPersonalPopupOpen, setIsEditPersonalPopupOpen] = useState(false);
	const [isAddNewCard, setIsAddNewCard] = useState(false);
	const [selectedCard, setSelectedCard] = useState({});
	const [cards, setCards] = useState([]);
	const [loadingForMain, setLoadingForMain] = useState(false);
	const [isConfirmationCardDeletionPopupOpened, setConfirmationCardDeletionPopupOpened] = useState({
		isOpen: false, card: {}
	});

	const [email, setEmail] = React.useState("");

	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		api.getInitialCards()
			.then((res) => {
				setCards([...res]);
				setLoadingForMain(true);
			})
			.catch((err) => {
				console.log(`Ошибка: ${err}`);
			});
	}, []);

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

	useEffect(() => {
		api.getUserInfo()
			.then((res) => {
				setCurrentUser({ ...res });
			})
			.catch((err) => {
				console.log(`Ошибка: ${err}`);
			});
	}, []);

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
		setSelectedCard({});
	};	

	function handleRegister(email, password) {
		auth.register(email, password)
			.then(data => {
				if (data) {
					// handleInfoTooltip(true);
					navigate('/sign-in', { replace: true })
				}
			})
			.catch(err => {
				console.log(err);
				// handleInfoTooltip(false);
			})
	}

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			auth
				.checkToken(token)
				.then((res) => {
					setEmail(res.data.email);
					setIsLoggedIn(true);
					navigate('/index', { replace: true })
				})
				.catch(console.error);
		}
	}, []);

	function handleLogin(data) {
		const { password, email } = data;
		auth
			.authorize(password, email)
			.then(data => {
				if (data.token) {
					setEmail(email);
					setIsLoggedIn(true);
					localStorage.setItem('token', data.token);
					navigate('/index', { replace: true })
				}
			})		
	}

	function handleLogOut() {
		localStorage.removeItem('token');
		setIsLoggedIn(false);
	}

	return (

		<div className="page__content">
			<Routes>
				<Route					
					path='/index'
					element={
						<>
							<ProtectedRoute isLoggedIn={isLoggedIn} />
							<CurrentUserContext.Provider value={currentUser}>
								<Main
									cards={cards}
									loadingForMain={loadingForMain}
									onEditAvatar={handleEditAvatarClick}
									onEditPersonalData={handleEditPersonalClick}
									onAddNewCard={handleAddNewCardClick}
									onCardClick={handleCardClick}
									onCardLike={handleCardLike}
									onCardDeleteClick={handleOpenConfirmationCardDeletionPopup}
									email={email}
									onLogOut={handleLogOut}
								/>
							</CurrentUserContext.Provider>

							<CurrentUserContext.Provider value={currentUser}>
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

								<ImagePopup card={selectedCard} onClose={closeAllPopups} />
							</CurrentUserContext.Provider>
						</>
					}
				/>

				<Route
					path='/sign-up'
					element={
						<Register onRegister={handleRegister} />
					}
				/>

				<Route
					path='/sign-in'
					element={
						<Login onLogin={handleLogin} />
					}
				/>

				<Route
					path='*'
					element={
						isLoggedIn ? <Navigate to='index' replace /> : <Navigate to='/sign-in' replace />}
						// isLoggedIn ? <Navigate to='/mesto-react-auth' replace /> : <Navigate to='/sign-in' replace />}
				/>
			</Routes>

			<Footer />
		</div>



	)
};

export default App;
