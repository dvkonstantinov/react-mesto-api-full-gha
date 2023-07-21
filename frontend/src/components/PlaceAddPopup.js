import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function PlaceAddPopup({ isOpen, onClose, onAddPlace }) {
  const { values, handleChange, errors, isValid, setValues, resetForm } = useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();
    const newCard = {
      name: values.placeName,
      url: values.placeUrl,
    };
    console.log(newCard);
    onAddPlace(newCard);
  }
  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      sectName="add"
      formName="Add"
      titleText="Новое место"
      buttonText="Создать"
      isValid={isValid}
    >
      <input
        name="placeName"
        type="text"
        className="form__input form__input_type_text"
        placeholder="Название"
        minLength={2}
        maxLength={30}
        required
        onChange={handleChange}
        value={values.placeName || ''}
      />
      <span className={`form__input-error ${isValid ? "" : "form__input-error_active"}`}>{errors.placeName}</span>
      <input
        name="placeUrl"
        type="url"
        className="form__input form__input_type_text"
        placeholder="Ссылка на картинку"
        required
        onChange={handleChange}
        value={values.placeUrl || ''}
      />
      <span className={`form__input-error ${isValid ? "" : "form__input-error_active"}`}>{errors.placeUrl}</span>
    </PopupWithForm>
  );
}

export default PlaceAddPopup;
