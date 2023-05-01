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
import EducationForm from "../Form/EducationForm/EducationForm";
import QualificationsForm from "../Form/QualificationsForm/QualificationsForm";
import AboutForm from "../Form/AboutForm/AboutForm";
import { useDispatch, useSelector } from "react-redux";
import { changeExp, changeProf, changeQual } from "../../redux/slices/formSlice";

function EditProfile() {
  const dispatch = useDispatch()
  const isVisibleExp = useSelector((state) => state.form.visibleExp);
  const isVisibleEdu = useSelector((state) => state.form.visibleProf);
  const isVisibleQual = useSelector((state) => state.form.visibleQual);

  const changeExperience = () => {
    dispatch(changeExp(false))
  }
  const changeEducation = () => {
    dispatch(changeProf(false))
  }
  const changeQualifications = () => {
    dispatch(changeQual(false))
  }

  return (
    <div className={m.container}>
      <ModifiedHeader />

      <h1 className={m.title}>Личный кабинет</h1>

      <div className={m.wrapper}>
        <div className={m.bar}>
          <NavLink className={m.button} to="/profile">
            <button className={m.button}>
              <div className={m.btnWrapp}>
                <img className={m.image} src={lines} alt="" />
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
          <NavLink className={m.button} to="/">
            <button className={m.button}>
              <div className={m.btnWrapp}>
                <img className={m.image} src={gear} alt="" />
                <span className={m.span}>Настройки</span>
              </div>
            </button>
          </NavLink>
          <NavLink className={m.button} to="/">
            <button className={m.button}>
              <div className={m.btnWrapp}>
                <img className={m.image} src={doors} alt="" />
                <span className={m.span}>Выйти</span>
              </div>
            </button>
          </NavLink>
        </div>
        <div className={m.formWrapper}>
          <PersonalForm />
          <ProfessionalForm />
          {isVisibleExp ? (
            <div className={m.infoBar}>
            <div className={m.infoWrapp}>
              <h3 className={m.titleSmall}>Опыт работы</h3>
                  <button className={m.btn} onClick={() => changeExperience()}>
                  Добавить место работы
                  </button>
            </div>
          </div>
          ) : (
            <ExperienceForm />
          )}
          {isVisibleEdu ? (
            <div className={m.infoBar}>
            <div className={m.infoWrapp}>
              <h3 className={m.titleSmall}>Образование</h3>
                  <button className={m.btn} onClick={() => changeEducation()}>
                  Добавить место учебы
                  </button>
            </div>
          </div>
          ) : (
            <EducationForm />
          )}
          {isVisibleQual ? (
            <div className={m.infoBar}>
            <div className={m.infoWrapp}>
              <h3 className={m.titleSmall}>Курсы и повышение квалификации</h3>
                  <button className={m.btn} onClick={() => changeQualifications()}>
                  Добавить место учебы
                  </button>
            </div>
          </div>
          ) : (
            <QualificationsForm />
          )}
          <AboutForm />
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
