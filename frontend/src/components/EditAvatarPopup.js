import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const { values, handleChange, errors, isValid, setValues, resetForm } = useFormAndValidation();
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: values.avatarUrl
    });
  }
  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      sectName="set-avatar"
      formName="SetAvatar"
      titleText="Обновить аватар"
      buttonText="Сохранить"
      isValid={isValid}
    >
      <input
        name="avatarUrl"
        type="url"
        className="form__input form__input_type_text"
        placeholder="Ссылка на картинку"
        required=""
        onChange={handleChange}
        value={values.avatarUrl  || ''}
      />
      <span className={`form__input-error ${isValid ? "" : "form__input-error_active"}`}>{errors.avatarUrl}</span>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
