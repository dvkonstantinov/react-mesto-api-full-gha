import { useRef } from "react";
import { Link } from "react-router-dom";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

export default function Register({ onRegister }) {
  const { values, handleChange, errors, isValid, setValues, resetForm } = useFormAndValidation();
  
  const emailRef = useRef();
  const passRef = useRef();
  function handleSubmit(e) {
    e.preventDefault();
    onRegister({
      email: emailRef.current.value,
      password: passRef.current.value,
    });
  }
  return (
    <section className="auth">
      <h1 className="auth__title">Регистрация</h1>
      <form className="auth__form form" name="formName" onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          className="form__input form__input_color_black"
          placeholder="Email"
          minLength="2"
          maxLength="40"
          required
          ref={emailRef}
          onChange={handleChange}
        />
        <span className={`form__input-error form__input-error_color_black ${isValid ? '' : 'form__input-error_active'}`}>{errors.email}</span>
        <input
          name="password"
          type="password"
          className="form__input form__input_color_black"
          placeholder="Пароль"
          minLength="2"
          maxLength="200"
          required
          ref={passRef}
          onChange={handleChange}
        />
        <span className={`form__input-error form__input-error_color_black ${isValid ? '' : 'form__input-error_active'}`}>
          {errors.password}
        </span>
        <button className={`form__button button form__button_color_black ${isValid ? '' : 'form__button_disabled'}`} type="submit" onSubmit={resetForm}>
          Зарегистрироваться
        </button>
      </form>
      <p className="auth__already">
        Уже зарегистрированы?{" "}
        <Link className="auth__already-link" to="/sign-in">
          Войти
        </Link>
      </p>
    </section>
  );
}
