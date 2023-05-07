import ModifiedHeader from "../Header/ModifiedHeader/ModifiedHeader";
import pen from "../../assets/images/edit-line.svg";
import lines from "../../assets/images/menu-3-line.svg";
import doors from "../../assets/images/door-open-line.svg";
import gear from "../../assets/images/settings-5-line.svg";
import star from "../../assets/images/star-line.svg";
import cases from "../../assets/images/briefcase-line.svg";
import m from "./Profile.module.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

function Profile() {
  const data = useSelector((state) => state.users.user);
  const logout = () => {
    localStorage.removeItem("userData");
    window.location.reload();
  };

  const startJob = data.exp?.startJob;
  const startJ = startJob?.slice(0, 10);
  const endJob = data.exp?.endJob;
  const endJ = endJob?.slice(0, 10);

  const startEdu = data.edu?.startEdu;
  const startE = startEdu?.slice(0, 10);
  const endEdu = data.edu?.endEdu;
  const endE = endEdu?.slice(0, 10);

  const startQual = data.qual?.startQual;
  const startQ = startQual?.slice(0, 10);
  const endQual = data.qual?.endQual;
  const endQ = endQual?.slice(0, 10);

  return (
    <div className={m.container}>
      <ModifiedHeader />

      <h1 className={m.title}>Личный кабинет</h1>

      <div className={m.wrapper}>
        <div className={m.bar}>
          <div className={m.profileWrapp}>
            <img alt="" src={data.pers?.profilePic} className={m.avatar}></img>
            <p className={m.name}>
              <span>{data.pers?.fname}</span> <span>{data.pers?.lname}</span>
            </p>
            <div className={m.littleWrapp}>
              <p className={m.genderText}>{data.pers?.gender}</p>
              <p className={m.location}>
                <span>{data.pers?.country}</span>,{" "}
                <span>{data.pers?.city}</span>
              </p>
            </div>
          </div>
          <select className={m.selector} name="" id="">
            <option value="В поиске проекта">В поиске проекта</option>
            <option value="Не ищу проект">Не ищу проект</option>
          </select>
          <NavLink className={m.button} to="/profile">
            <button className={m.button}>
              <div className={m.btnWrapp}>
                <img src={lines} className={m.image} alt="" />
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
                <img src={cases} className={m.image} alt="" />
                <span className={m.span}>Мои проекты</span>
              </div>
            </button>
          </NavLink>
          <NavLink className={m.button} to="/">
            <button className={m.button}>
              <div className={m.btnWrapp}>
                <img src={star} className={m.image} alt="" />
                <span className={m.span}>Избранное</span>
              </div>
            </button>
          </NavLink>
          <NavLink className={m.button} to="/">
            <button className={m.button}>
              <div className={m.btnWrapp}>
                <img src={gear} className={m.image} alt="" />
                <span className={m.span}>Настройки</span>
              </div>
            </button>
          </NavLink>
          <NavLink className={m.button} to="/">
            <button className={m.button} onClick={() => logout()}>
              <div className={m.btnWrapp}>
                <img src={doors} className={m.image} alt="" />
                <span className={m.span}>Выйти</span>
              </div>
            </button>
          </NavLink>
        </div>

        <div className={m.infoBar}>
          <div className={m.persWrapp}>
            <h3 className={m.infoTitle}>Профессиональная информация</h3>

            <div className={m.personalInfo}>
              <h3 className={m.post}>{data.job?.post}</h3>
              <span className={m.postLevel}>{data.job?.postLevel}</span>
              <br />
              <span className={m.lang}>
                {data.job?.lang}, {data.job?.langLevel}
              </span>
            </div>

            <div className={m.tagsWrapper}>
              {data.job?.skills.map((tag, i) => (
                <div key={i} className={m.tags}>
                  <span className={m.tag}>{tag}</span>
                </div>
              ))}
            </div>
          </div>

          {data?.exp ? (
            <div className={m.expWrapp}>
              <h3 className={m.infoTitle}>Опыт работы</h3>

              <div className={m.expInfo}>
                <h3 className={m.postTitle}>{data.exp?.jobPost}</h3>
                <p className={m.companyWrapp}>
                  <span className={m.postLevel}>{data.exp?.company}</span>,{" "}
                  <span className={m.date}>
                    {startJ} - {endJ}
                  </span>
                </p>
                <p className={m.progress}>{data.exp?.progress}</p>
              </div>
            </div>
          ) : (
            ""
          )}

          {data?.edu ? (
            <div className={m.expWrapp}>
              <h3 className={m.infoTitle}>Образование</h3>

              <div className={m.expInfo}>
                <h3 className={m.eduTitle}>{data.edu?.specialization}</h3>
                <p className={m.instWrapp}>
                  <span className={m.postLevel}>{data.edu?.institution}</span><br/>
                  <span className={m.date}>
                    {startE} - {endE}
                  </span>
                </p>
              </div>
            </div>
          ) : (
            ""
          )}

          {data?.qual ? (
            <div className={m.expWrapp}>
              <h3 className={m.infoTitle}>Курсы и повышение квалификации</h3>

              <div className={m.expInfo}>
                <h3 className={m.eduTitle}>{data.qual?.qualName}</h3>
                <p className={m.instWrapp}>
                  <span className={m.postLevel}>{data.qual?.qualInstitution}</span><br/>
                  <span className={m.date}>
                    {startQ} - {endQ}
                  </span>
                </p>
              </div>
            </div>
          ) : (
            ""
          )}  

          {data?.about ? (
            <div className={m.expWrapp}>
              <h3 className={m.infoTitle}>О себе</h3>

              <div className={m.aboutInfo}>
                <p className={m.aboutText}>{data.about?.aboutMe}</p>
              </div>
            </div>
          ) : (
            ""
          )}  
        </div>
      </div>
    </div>
  );
}

export default Profile;
