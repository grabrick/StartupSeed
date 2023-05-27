import m from "./Header.module.css";
import Logo from "../../../assets/images/logo.svg";
import { NavLink } from "react-router-dom";
import RegisterPopup from "../../Popup/RegisterPopup/RegisterPopup";
import LoginPopup from "../../Popup/LoginPopup/LoginPopup";
import { useDispatch, useSelector } from "react-redux";
import { activeLogin, activeRegister } from "../../../redux/slices/popupSlice";

function Header() {
  const isVisibleLogin = useSelector((state) => state.popup.visibleLogin);
  const isVisibleRegister = useSelector((state) => state.popup.visibleRegister);
  const dispatch = useDispatch()

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
          <div className={m.wrapper}>
            <img src={Logo} alt="" className={m.logo} />
          </div>
          <div className={m.wrapper}>
            <NavLink className={m.link}>Главная</NavLink>
            <NavLink className={m.link}>О нас</NavLink>
            <NavLink className={m.link}>Отзывы</NavLink>
            <NavLink className={m.link}>Вопросы</NavLink>
            <NavLink className={m.link}>Контакты</NavLink>
          </div>
          <div className={m.wrapper}>
            <button className={m.buttonLog} onClick={handlePopupLoginClick}>
              Вход
            </button>
            <button className={m.buttonReg} onClick={handlePopupRegistrClick}>
              Регистрация
            </button>
          </div>
          {isVisibleLogin ? <LoginPopup /> : ''}
          {isVisibleRegister === true && <RegisterPopup />}
        </div>
      </header>
    </>
  );
}

export default Header;
