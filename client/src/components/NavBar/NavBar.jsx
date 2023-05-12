import { NavLink } from "react-router-dom";
import pen from "../../assets/images/edit-line.svg";
import lines from "../../assets/images/menu-3-line.svg";
import doors from "../../assets/images/door-open-line.svg";
import gear from "../../assets/images/settings-5-line.svg";
import star from "../../assets/images/star-line.svg";
import cases from "../../assets/images/briefcase-line.svg";
import m from "./NavBar.module.css";


const logout = () => {
  localStorage.removeItem("userData")
  setTimeout(() => {
    window.location.reload()
    window.location.replace('/')
  }, 2000);
}

function NavBar() {
    return (  
        <div className={m.bar}>
          <NavLink className={m.button} to="/profile">
            <button className={m.button}>
              <div className={m.btnWrapp}>
                <img className={m.image} src={lines} alt="" />
                <span className={m.span}>Профиль</span>
              </div>
              <NavLink to="/profile/edit">
                <img className={m.editPen} src={pen} alt="" />
              </NavLink>
            </button>
          </NavLink>
          <NavLink className={m.button} to="/">
            <button className={m.button}>
              <div className={m.btnWrapp}>
                <img className={m.image} src={cases} alt="" />
                <span className={m.span}>Мои проекты</span>
              </div>
            </button>
          </NavLink>
          <NavLink className={m.button} to="/">
            <button className={m.button}>
              <div className={m.btnWrapp}>
                <img className={m.image} src={star} alt="" />
                <span className={m.span}>Избранное</span>
              </div>
            </button>
          </NavLink>
          <NavLink className={m.button} to="/profile/settings">
            <button className={m.button}>
              <div className={m.btnWrapp}>
                <img className={m.image} src={gear} alt="" />
                <span className={m.span}>Настройки</span>
              </div>
            </button>
          </NavLink>
            <button className={m.button} onClick={() => logout()} >
              <div className={m.btnWrapp}>
                <img className={m.image} src={doors} alt="" />
                <span className={m.span}>Выйти</span>
              </div>
            </button>
        </div>
    );
}

export default NavBar;