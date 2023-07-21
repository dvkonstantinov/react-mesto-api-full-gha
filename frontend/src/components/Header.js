
import { useLocation, Link } from "react-router-dom";
import logoPath from "../images/logo.svg";

export default function Header({ isLoggedIn, isNavOpen, setIsNavOpen, email, handleLogout}) {
  function onBurgerClick() {
    setIsNavOpen(!isNavOpen);
  }
  const url = useLocation().pathname;
  return (
    <header className={`header ${isLoggedIn ? "header_column" : ""}`}>
      <div className="header__image-menu">
        <img className="logo" src={logoPath} alt="" />
        {isLoggedIn && (
          <button
            className={`header__burger ${isNavOpen ? "header__burger_open" : ""}`}
            onClick={onBurgerClick}
          ></button>
        )}
      </div>
      <nav className={`nav ${isLoggedIn ? "nav_column" : ""} ${isNavOpen ? "nav_opened" : ""}`}>
        {isLoggedIn ? (
          <>
            <span className="nav__account">{email}</span>
            <Link to="/sign-in" className="nav__action" onClick={handleLogout}>
              Выйти
            </Link>
          </>
        ) : url === "/sign-in" ? (
          <span className="header__action">
            <Link className="header__link" to="/sign-up">
              Зарегистрироваться
            </Link>
          </span>
        ) : (
          <span className="header__action">
            <Link className="header__link" to="/sign-in">
              Войти
            </Link>
          </span>
        )}
      </nav>
    </header>
  );
}
