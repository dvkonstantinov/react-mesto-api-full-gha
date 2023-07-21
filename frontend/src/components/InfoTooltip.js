import { useRef } from "react";

export default function InfoTooltip({ isOpen, onClose, isSuccess }) {
  const popupInfoToolTipRef = useRef();

  function handlePopupContainerClick(e) {
    if (e.target === popupInfoToolTipRef.current) {
      onClose();
    }
  }
  return (
    <section
      className={`popup popup__auth ${isOpen ? "popup_opened" : ""}`}
      onClick={handlePopupContainerClick}
      ref={popupInfoToolTipRef}
    >
      <div className="popup__container">
        <button className="popup__close button" onClick={onClose}></button>
        <div
          className={`popup__image-auth ${
            isSuccess ? "popup__image-auth_success" : "popup__image-auth_fail"
          }`}
        ></div>
        <h3 className="popup__title popup__title_auth">
          {isSuccess ? "Вы успешно зарегистрировались" : "Что-то пошло не так! Попробуйте ещё раз."}
        </h3>
      </div>
    </section>
  );
}
