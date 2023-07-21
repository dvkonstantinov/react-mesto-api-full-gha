import PopupWithForm from "./PopupWithForm";
function CardRemovePopup({ isOpen, onClose, onApprove}) {
  function handleSubmit(e) {
    e.preventDefault();
    onApprove()
  }
  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      sectName="card-remove"
      formName="Remove"
      titleText="Вы уверены?"
      buttonText="Да"
    />
  );
}

export default CardRemovePopup;
