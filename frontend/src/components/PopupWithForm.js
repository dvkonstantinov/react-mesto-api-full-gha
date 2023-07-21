import { useRef } from "react";

export default function PopupWithForm({
  isOpen,
  onClose,
  onSubmit,
  sectName,
  formName,
  titleText,
  buttonText,
  children,
  isValid
}) {
  const popupContainerRef = useRef();
  function handlePopupContainerClick(e) {
    if (e.target === popupContainerRef.current) {
      onClose();
    }
  }

  return (
    <section
      className={`popup popup_${sectName} ${isOpen ? "popup_opened" : ""}`}
      id={`popup${formName}`}
      ref={popupContainerRef}
      onClick={handlePopupContainerClick}
    >
      <div className="popup__container">
        <button className="popup__close button" onClick={onClose} type="button"></button>
        <h3 className="popup__title">{titleText}</h3>
        <form
          className="form"
          method="POST"
          name={`form${formName}`}
          id={`form${formName}`}
          onSubmit={onSubmit}
        >
          {children}
          <button
            className={`form__button button ${isValid ? "" : "form__button_disabled"}`}
            type="submit"
            disabled={!isValid ? "" : false}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </section>
  );
}
