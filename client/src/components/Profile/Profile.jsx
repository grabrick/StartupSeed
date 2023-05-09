import ModifiedHeader from "../Blocks/Header/ModifiedHeader/ModifiedHeader";
import m from "./Profile.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { getUser } from "../../redux/slices/userSlice";
import NavBar from "../NavBar/NavBar";

function Profile() {
  const data = useSelector((state) => state.users.user);
  const dispatch = useDispatch();
  const User = (items) => {
    dispatch(getUser(items));
  };

  useEffect(() => {
    axios.get("http://localhost:3000/api/auth/get")
      .then((items) => {
        User(items.data);
        console.log(items.data);
      })
      .catch((e) => {
        console.log(e);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const startJob = data.more?.exp.startJob;
  const startJ = startJob?.slice(0, 10);
  const endJob = data.more?.exp.endJob;
  const endJ = endJob?.slice(0, 10);

  const startEdu = data.more?.edu.startEdu;
  const startE = startEdu?.slice(0, 10);
  const endEdu = data.more?.edu.endEdu;
  const endE = endEdu?.slice(0, 10);

  const startQual = data.more?.qual.startQual;
  const startQ = startQual?.slice(0, 10);
  const endQual = data.more?.qual.endQual;
  const endQ = endQual?.slice(0, 10);

  return (
    <div className={m.container}>
      <ModifiedHeader />

      <h1 className={m.title}>Личный кабинет</h1>

      <div className={m.wrapper}>
        <div className={m.bar}>
          <div className={m.profileWrapp}>
            <img alt="" src={data.more?.pers?.profilePic} className={m.avatar}></img>
            <p className={m.name}>
              <span>{data.more?.pers?.fname}</span> <span>{data.more?.pers?.lname}</span>
            </p>
            <div className={m.littleWrapp}>
              <p className={m.genderText}>{data.more?.pers?.gender}</p>
              <p className={m.location}>
                <span>{data.more?.pers?.country}</span>,{" "}
                <span>{data.more?.pers?.city}</span>
              </p>
            </div>
          </div>
          <select className={m.selector} name="" id="">
            <option value="В поиске проекта">В поиске проекта</option>
            <option value="Не ищу проект">Не ищу проект</option>
          </select>
          <>
            <NavBar />
          </>
        </div>

        <div className={m.infoBar}>
          <div className={m.persWrapp}>
            <h3 className={m.infoTitle}>Профессиональная информация</h3>

            <div className={m.personalInfo}>
              <h3 className={m.post}>{data.more?.job?.post}</h3>
              <span className={m.postLevel}>{data.more?.job?.postLevel}</span>
              <br />
              <span className={m.lang}>
                {data.more?.job?.lang}, {data.more?.job?.langLevel}
              </span>
            </div>

            <div className={m.tagsWrapper}>
              {data.more?.job?.skills.map((tag, i) => (
                <div key={i} className={m.tags}>
                  <span className={m.tag}>{tag}</span>
                </div>
              ))}
            </div>
          </div>

          {data.more?.exp ? (
            <div className={m.expWrapp}>
              <h3 className={m.infoTitle}>Опыт работы</h3>

              <div className={m.expInfo}>
                <h3 className={m.postTitle}>{data.more?.exp?.jobPost}</h3>
                <p className={m.companyWrapp}>
                  <span className={m.postLevel}>{data.more?.exp?.company}</span>,{" "}
                  <span className={m.date}>
                    {startJ} - {endJ}
                  </span>
                </p>
                <p className={m.progress}>{data.more?.exp?.progress}</p>
              </div>
            </div>
          ) : (
            ""
          )}

          {data.more?.edu ? (
            <div className={m.expWrapp}>
              <h3 className={m.infoTitle}>Образование</h3>

              <div className={m.expInfo}>
                <h3 className={m.eduTitle}>{data.more?.edu?.specialization}</h3>
                <p className={m.instWrapp}>
                  <span className={m.postLevel}>{data.more?.edu?.institution}</span><br/>
                  <span className={m.date}>
                    {startE} - {endE}
                  </span>
                </p>
              </div>
            </div>
          ) : (
            ""
          )}

          {data.more?.qual ? (
            <div className={m.expWrapp}>
              <h3 className={m.infoTitle}>Курсы и повышение квалификации</h3>

              <div className={m.expInfo}>
                <h3 className={m.eduTitle}>{data.more?.qual?.qualName}</h3>
                <p className={m.instWrapp}>
                  <span className={m.postLevel}>{data.more?.qual?.qualInstitution}</span><br/>
                  <span className={m.date}>
                    {startQ} - {endQ}
                  </span>
                </p>
              </div>
            </div>
          ) : (
            ""
          )}  

          {data.more?.about ? (
            <div className={m.expWrapp}>
              <h3 className={m.infoTitle}>О себе</h3>

              <div className={m.aboutInfo}>
                <p className={m.aboutText}>{data.more?.about?.aboutMe}</p>
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
