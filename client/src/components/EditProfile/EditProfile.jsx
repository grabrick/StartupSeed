import ModifiedHeader from "../Blocks/Header/ModifiedHeader/ModifiedHeader";
import m from "./EditProfile.module.css";
import PersonalForm from "../Form/PersonalForm/PersonalForm";
import ProfessionalForm from "../Form/ProfessionalForm/ProfessionalForm";
import ExperienceForm from "../Form/ExperienceForm/ExperienceForm";
import EducationForm from "../Form/EducationForm/EducationForm";
import QualificationsForm from "../Form/QualificationsForm/QualificationsForm";
import AboutForm from "../Form/AboutForm/AboutForm";
import { useDispatch, useSelector } from "react-redux";
import { changeExp, changeProf, changeQual } from "../../redux/slices/formSlice";
import NavBar from "../NavBar/NavBar";

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
        <NavBar />
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
