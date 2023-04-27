import m from "./ModifiedHeader.module.css";
import Logo from "../../../assets/images/logo.svg";
import message from "../../../assets/images/mail-line.svg"
import profile from "../../../assets/images/user-line.svg"
import { NavLink } from "react-router-dom";

function ModifiedHeader() {
  return (
    <>
      <div className={m.container}>
        <div className={m.wrapper}>
          <NavLink to="/home">
            <img src={Logo} alt="" className={m.logo} />
          </NavLink>

          <div className={m.wrapper}>
            <NavLink className={m.link}>Проекты</NavLink>
            <NavLink className={m.link}>Специалисты</NavLink>
          </div>
        </div>

        <div className={m.wrapper}>
          <img className={m.image} src={message} alt="" />
          <NavLink to="/profile"> 
            <img className={m.image} src={profile} alt="" />
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default ModifiedHeader;
