function ImagePopup({ card, onClose }) {
  return (
    <section
      className={`popup popup_image ${card.name ? "popup_opened" : ""}`}
      id="popupImage"
    >
      <div className="popup__container popup__container_image">
        <button className="popup__close button" type="button" onClick={onClose}></button>
        <img className="popup__image" alt={card.name} src={card.link} />
        <span className="popup__title popup__title_image">{card.name}</span>
      </div>
    </section>
  );
}

export default ImagePopup;
