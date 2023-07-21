import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `card__like button button_type_like ${
    isLiked && "button_type_like_active"
  }`;
  function handleCardClick() {
    onCardClick(card);
  }

  function handleLikeCard() {
    onCardLike(card);
  }
  function handleDeleteClick() {
    onCardDelete(card);
  }
  return (
    <div className="card">
      <div className="card__inner">
        <img className="card__image" src={card.link} alt={card.name} onClick={handleCardClick} />
        <div className="card__caption">
          <h2 className="card__title">{card.name}</h2>
          <div className="card__like-container">
            <button
              className={cardLikeButtonClassName}
              aria-label="Лайкнуть"
              type="button"
              onClick={handleLikeCard}
            ></button>
            <span className="card__like-amount">{card.likes.length}</span>
          </div>
        </div>
        {isOwn && (
          <button
            className="card__remove button button_type_remove"
            onClick={handleDeleteClick}
          ></button>
        )}
      </div>
    </div>
  );
}

export default Card;
