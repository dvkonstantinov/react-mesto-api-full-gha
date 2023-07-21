import { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const { values, handleChange, errors, isValid, setValues, resetForm } = useFormAndValidation();
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleChangeName(e) {
    setName(e.target.value);
    handleChange(e);
    console.log(values);
  }
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }
  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      sectName="edit"
      formName="Edit"
      titleText="Редактировать профиль"
      buttonText="Сохранить"
      isValid={isValid}
    >
      <input
        name="name"
        type="text"
        className="form__input form__input_type_text"
        placeholder="Имя"
        minLength={2}
        maxLength={40}
        required=""
        onChange={handleChangeName}
        value={name ? name : ""}
      />
      <span className={`form__input-error ${isValid ? "" : "form__input-error_active"}`}>{errors.name}</span>
      <input
        name="status"
        type="text"
        className="form__input form__input_type_text"
        placeholder="Статус"
        minLength={2}
        maxLength={200}
        required=""
        onChange={handleChangeDescription}
        value={description ? description : ""}
      />
      <span className={`form__input-error ${isValid ? "" : "form__input-error_active"}`}>{errors.status}</span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
