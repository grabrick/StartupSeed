import m from "./Header.module.css";
import Logo from "../../../../assets/images/logo.svg";
import Menu from "../../../../assets/images/indent-decrease.svg";
import { NavLink } from "react-router-dom";
import RegisterPopup from "../../../UI/Popup/RegisterPopup/RegisterPopup";
import LoginPopup from "../../../UI/Popup/LoginPopup/LoginPopup";
import { useDispatch, useSelector } from "react-redux";
import { activeLogin, activeRegister } from "../../../../redux/slices/popupSlice";
import { useState } from "react";

function Header() {
  const isVisibleLogin = useSelector((state) => state.popup.visibleLogin);
  const isVisibleRegister = useSelector((state) => state.popup.visibleRegister);
  const [open, setOpen] = useState(false);
  const activeMenu = `${m.activeMenuBurger}`;
  const inactiveMenu = `${m.inactiveMenuBurger}`;
  const dispatch = useDispatch();

  const handlePopupRegistrClick = () => {
    dispatch(activeRegister(true));
  };

  const handlePopupLoginClick = () => {
    dispatch(activeLogin(true));
  };

  return (
    <>
      <header className={m.container}>
        <div className={m.containerWrapper}>
          <img src={Logo} alt="" className={m.logo} />
          <div className={m.BurgerWrapper}>
            <img
              src={Menu}
              className={m.burger}
              onClick={() => setOpen(!open)}
              alt=""
            />
            <div className={open ? activeMenu : inactiveMenu}>
              <div className={m.burgerMenuWrapper}>
                <div className={m.linkWrapp}>
                  <NavLink className={m.link}>Главная</NavLink>
                  <NavLink className={m.link}>О нас</NavLink>
                  <NavLink className={m.link}>Отзывы</NavLink>
                  <NavLink className={m.link}>Вопросы</NavLink>
                  <NavLink className={m.link}>Контакты</NavLink>
                </div>
                <div className={m.wrapperButton}>
                  <button
                    className={m.buttonLog}
                    onClick={handlePopupLoginClick}
                  >
                    Вход
                  </button>
                  <button
                    className={m.buttonReg}
                    onClick={handlePopupRegistrClick}
                  >
                    Регистрация
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className={m.wrapper}>
            <div className={m.wrapperLink}>
              <NavLink className={m.link}>Главная</NavLink>
              <NavLink className={m.link}>О нас</NavLink>
              <NavLink className={m.link}>Отзывы</NavLink>
              <NavLink className={m.link}>Вопросы</NavLink>
              <NavLink className={m.link}>Контакты</NavLink>
            </div>
            <div className={m.wrapperButton}>
              <button className={m.buttonLog} onClick={handlePopupLoginClick}>
                Вход
              </button>
              <button className={m.buttonReg} onClick={handlePopupRegistrClick}>
                Регистрация
              </button>
            </div>
          </div>
          {isVisibleLogin ? <LoginPopup /> : ""}
          {isVisibleRegister ? <RegisterPopup /> : ""}
        </div>
      </header>
    </>
  );
}

export default Header;
