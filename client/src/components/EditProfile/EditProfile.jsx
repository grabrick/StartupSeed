import ModifiedHeader from "../UI/Blocks/Header/ModifiedHeader/ModifiedHeader";
import m from "./EditProfile.module.css";
import PersonalForm from "../UI/Form/PersonalForm/PersonalForm";
import ProfessionalForm from "../UI/Form/ProfessionalForm/ProfessionalForm";
import ExperienceForm from "../UI/Form/ExperienceForm/ExperienceForm";
import EducationForm from "../UI/Form/EducationForm/EducationForm";
import QualificationsForm from "../UI/Form/QualificationsForm/QualificationsForm";
import AboutForm from "../UI/Form/AboutForm/AboutForm";
import { useDispatch, useSelector } from "react-redux";
import { changeExp, changeProf, changeQual } from "../../redux/slices/formSlice";
import NavBar from "../UI/NavBar/NavBar";
import { useEffect } from "react";
import { getSkills } from "../../redux/slices/skillsSlice";
import axios from "axios";
import { getUser } from "../../redux/slices/userSlice";

function EditProfile({isAdmin}) {
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

  const User = (items) => {
    dispatch(getUser(items));
  };

  const Skills = (items) => {
    dispatch(getSkills(items));
  };

  useEffect(() => {
    const ID = JSON.parse(localStorage.getItem("userData"));
    const userId = ID.userID
    axios
    .get(`/api/auth/${userId}/get`)
      .then((items) => {
        User(items.data);
        Skills(items.data.more.job.skills);
      })
      .catch((e) => {
        console.log(e);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={m.container}>
      <ModifiedHeader isAdmin={isAdmin} />

      <h1 className={m.title}>Личный кабинет</h1>

      <div className={m.wrapper}>
        <NavBar currentBtn={"Profile"} />
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
