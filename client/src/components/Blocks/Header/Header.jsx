import m from "./Header.module.css";
import Logo from "../../../assets/images/logo.svg";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import RegisterPopup from "../../AuthUser/RegisterPopup/RegisterPopup";
import LoginPopup from "../../AuthUser/LoginPopup/LoginPopup"

function Header() {
  const [isPopupReg, setIsPopupReg] = useState(false);
  const [isPopupLog, setIsPopupLog] = useState(false);
  
  const handlePopupRegistrClick = () => {
    setIsPopupReg(true);
  };

  const handlePopupLoginClick = () => {
    setIsPopupLog(true);
  };

  return (
    <>
      <div className={m.container}>
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
            <button className={m.buttonLog} onClick={handlePopupLoginClick}>Вход</button>
            <button className={m.buttonReg} onClick={handlePopupRegistrClick}>Регистрация</button>
        </div>
        {isPopupLog === true && <LoginPopup close={setIsPopupLog} />}
        {isPopupReg === true && <RegisterPopup close={setIsPopupReg} />}
      </div>
    </>
  );
}

export default Header;
