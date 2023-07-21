import "./index.css";
import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import ImagePopup from "./ImagePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import PlaceAddPopup from "./PlaceAddPopup";
import CardRemovePopup from "./CardRemovePopup";
import CurrentUserContext from "../contexts/CurrentUserContext";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import { api } from "../utils/Api";
import { apiAuth } from "../utils/AuthApi";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isCardRemovePopupOpen, setIsCardRemovePopupOpen] = useState(false);
  const [removingCard, setRemovingCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  function closeAllPopups() {
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setIsCardRemovePopupOpen(false);
    setIsInfoToolTipOpen(false);
    setSelectedCard({});
  }

  function closeByEsc(e) {
    if (e.key === "Escape") {
      closeAllPopups();
    }
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
    window.addEventListener("keydown", (e) => closeByEsc(e));
  }
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
    window.addEventListener("keydown", (e) => closeByEsc(e));
  }
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
    window.addEventListener("keydown", (e) => closeByEsc(e));
  }
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api.likeDislikeCard(card._id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  }
  function handleCardDelete(card) {
    setIsCardRemovePopupOpen(true);
    window.addEventListener("keydown", (e) => closeByEsc(e));
    setRemovingCard(card);
  }
  function handleCardDeleteApprove() {
    api
      .removeCard(removingCard._id)
      .then(() => {
        const newCards = cards.filter((item) => item !== removingCard);
        setCards(newCards);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleUpdateUser(data) {
    api
      .setUserInfo(data.name, data.about)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleUpdateAvatar(data) {
    api
      .updateAvatar(data.avatar)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleAddPlaceSubmit(newCardData) {
    api
      .addCard(newCardData.name, newCardData.url)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardData]) => {
        setCurrentUser(userData);
        setCards(cardData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    // const jwt = localStorage.getItem("jwt");
    // if (jwt) {
    apiAuth
      .getMyInfo()
      .then((response) => {
        setIsLoggedIn(true);
        setEmail(response.data.email);
        navigate("/");
      })
      .catch((err) => {
        setIsLoggedIn(false);
        console.log(err.message);
      });
    // }
  }, [navigate]);

  function handleLogout() {
    // localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    navigate("/login");
  }

  function handleLogin({ email, password }) {
    apiAuth
      .signIn(email, password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setIsLoggedIn(true);
        setEmail(email);
        navigate("/");
      })
      .catch((err) => {
        if (err.status === 400) {
          console.log("400 - не передано одно из полей");
        }
        if (err.status === 401) {
          console.log("401 - пользователь с email не найден");
        }
      });
  }

  function handleRegister({ email, password }) {
    apiAuth
      .signUp(email, password)
      .then((data) => {
        setIsInfoToolTipOpen(true);
        setIsSuccess(true);
      })
      .catch((err) => {
        if (err.status === 400) {
          console.log("400 - не передано одно из полей");
        }
        if (err.status === 401) {
          console.log("401 - пользователь с email не найден");
        }
        setIsInfoToolTipOpen(true);
        setIsSuccess(false);
      });
  }
  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          isLoggedIn={isLoggedIn}
          isNavOpen={isNavOpen}
          setIsNavOpen={setIsNavOpen}
          email={email}
          handleLogout={handleLogout}
        />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                onCardClick={handleCardClick}
                element={Main}
                isLoggedIn={isLoggedIn}
              />
            }
          />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
          <Route path="/sign-up" element={<Register onRegister={handleRegister} />} />
        </Routes>
        <Footer />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <PlaceAddPopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <CardRemovePopup
          isOpen={isCardRemovePopupOpen}
          onClose={closeAllPopups}
          onApprove={handleCardDeleteApprove}
        />
        <InfoTooltip isOpen={isInfoToolTipOpen} onClose={closeAllPopups} isSuccess={isSuccess} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
