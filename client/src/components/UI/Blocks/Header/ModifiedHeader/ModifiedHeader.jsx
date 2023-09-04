import m from "./ModifiedHeader.module.css";
import Logo from "../../../../../assets/images/logo.svg";
import profile from "../../../../../assets/images/user-line.svg";
import shield from "../../../../../assets/images/shield-star-line.svg"
import { NavLink } from "react-router-dom";

function ModifiedHeader({isAdmin}) {
  return (
    <header className={m.container}>
      <div className={m.containerWrapper}>
        <div className={m.wrapper}>
          <NavLink to="/home">
            <img src={Logo} alt="" className={m.logo} />
          </NavLink>

          <div className={m.wrapper}>
            <NavLink to="/project" className={m.link}>
              Проекты
            </NavLink>
            <NavLink to="/specialists" className={m.link}>
              Специалисты
            </NavLink>
          </div>
        </div>

        <div className={m.wrapper}>
          {isAdmin && (
            <NavLink to="/admin/control">
              <img className={m.image} src={shield} alt="" />
            </NavLink>
          )}
          <NavLink to="/profile">
            <img className={m.image} src={profile} alt="" />
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export default ModifiedHeader;
