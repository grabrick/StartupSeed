import m from "./Header.module.css";
import Logo from "../../assets/images/logo.svg";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import Popup from "../Popup/Popup";

function Header() {
  const [isPopup, setIsPopup] = useState(false);
  
  const handlePopupRegistrClick = () => {
    setIsPopup(true);
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
            <button className={m.buttonLog}>Вход</button>
            <button className={m.buttonReg} onClick={handlePopupRegistrClick}>Регистрация</button>
        </div>
        {isPopup === true && <Popup close={setIsPopup} />}
      </div>
    </>
  );
}

export default Header;
