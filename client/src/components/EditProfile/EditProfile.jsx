import { NavLink } from "react-router-dom";
import ModifiedHeader from "../Header/ModifiedHeader/ModifiedHeader";
import pen from "../../assets/images/edit-line.svg";
import lines from "../../assets/images/menu-3-line.svg";
import doors from "../../assets/images/door-open-line.svg";
import gear from "../../assets/images/settings-5-line.svg";
import star from "../../assets/images/star-line.svg";
import cases from "../../assets/images/briefcase-line.svg";
import m from "./EditProfile.module.css";
import PersonalForm from "../Form/PersonalForm/PersonalForm";
import ProfessionalForm from "../Form/ProfessionalForm/ProfessionalForm";
import ExperienceForm from "../Form/ExperienceForm/ExperienceForm";

function EditProfile() {
  return (
    <div className={m.container}>
      <ModifiedHeader />

      <h1 className={m.title}>Личный кабинет</h1>

      <div className={m.wrapper}>
        <div className={m.bar}>
          <NavLink className={m.button} to="/profile">
            <button className={m.button}>
              <div className={m.btnWrapp}>
                <img src={lines} alt="" />
                <span className={m.span}>Профиль</span>
              </div>
              <NavLink to="/edit">
                <img className={m.editPen} src={pen} alt="" />
              </NavLink>
            </button>
          </NavLink>
          <NavLink className={m.button} to="/">
            <button className={m.button}>
              <div className={m.btnWrapp}>
                <img src={cases} alt="" />
                <span className={m.span}>Мои проекты</span>
              </div>
            </button>
          </NavLink>
          <NavLink className={m.button} to="/">
            <button className={m.button}>
              <div className={m.btnWrapp}>
                <img src={star} alt="" />
                <span className={m.span}>Избранное</span>
              </div>
            </button>
          </NavLink>
          <NavLink className={m.button} to="/">
            <button className={m.button}>
              <div className={m.btnWrapp}>
                <img src={gear} alt="" />
                <span className={m.span}>Настройки</span>
              </div>
            </button>
          </NavLink>
          <NavLink className={m.button} to="/">
            <button className={m.button}>
              <div className={m.btnWrapp}>
                <img src={doors} alt="" />
                <span className={m.span}>Выйти</span>
              </div>
            </button>
          </NavLink>
        </div>
        <div className={m.formWrapper}>
          <PersonalForm />
          <ProfessionalForm />
          <ExperienceForm />
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
