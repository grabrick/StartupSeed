import m from "./Footer.module.css";
import Logo from "../../assets/images/logo.svg";
import Phone from "../../assets/images/phone.svg";
import Mail from "../../assets/images/mail.svg";
import Telega from "../../assets/images/telegram.svg";
import VK from "../../assets/images/vk.svg";
import Insta from "../../assets/images/instagram.svg";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <div className={m.container}>
      <div className={m.wrapper}>
        <div className={m.infoWrapp}>
            <img className={m.logo} src={Logo} alt="" />
          <div className={m.textWrapper}>
            <h3 className={m.title}>О проекте</h3>
            <span className={m.text}>
              Пользовательское
              <br /> соглашение
            </span>
            <span className={m.text}>Правила</span>
            <span className={m.text}>Помощь</span>
            <span className={m.text}>Услуги проекта</span>
          </div>
          <div className={m.textWrapper}>
            <h3 className={m.title}>Страницы</h3>
            <span className={m.text}>Главная</span>
            <span className={m.text}>О нас</span>
            <span className={m.text}>Контакты</span>
            <span className={m.text}>Вопросы</span>
          </div>
        </div>
        <div className={m.socInfo}>
          <div className={m.numbWrapp}>
            <img className={m.imagePhone} src={Phone} alt="" />
            <div className={m.numbWrapper}>
              <p className={m.numbPhone}>+88124080712</p>
              <span className={m.numbSmallText}>Заказать звонок</span>
            </div>
          </div>
          <div className={m.mailWrapp}>
            <img className={m.imageMail} src={Mail} alt="" />
            <p className={m.numbMail}>frolenkov.d@internet.ru</p>
          </div>
          <button className={m.button}>Оставить заявку</button>
          <p className={m.numbText}>Следи за нами в соц сетях:</p>
          <div className={m.socWrapper}>
            <img className={m.image} src={Telega} alt="" />
            <img className={m.image} src={VK} alt="" />
            <img className={m.image}  src={Insta} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
