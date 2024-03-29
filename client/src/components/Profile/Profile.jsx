import ModifiedHeader from "../UI/Blocks/Header/ModifiedHeader/ModifiedHeader";
import m from "./Profile.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { getUser } from "../../redux/slices/userSlice";
import NavBar from "../UI/NavBar/NavBar";
import { getSkills } from "../../redux/slices/skillsSlice";
import ActivitySelector from "../UI/Selectors/ActivitySelector/ActivitySelector";
import SkillsComponent from "../UI/Skills/Skills";
import ProfileComponent from "../UI/Profile/Profile";

function Profile({ isAdmin }) {
  const data = useSelector((state) => state.users.user);
  const dispatch = useDispatch();
  const ID = JSON.parse(localStorage.getItem("userData"));
  const userId = ID?.userID;
  const User = (items) => {
    dispatch(getUser(items));
  };
  const Skills = (items) => {
    dispatch(getSkills(items));
  };

  useEffect(() => {
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

  const startEdu = data?.more?.edu?.startEdu;
  const startE = startEdu?.slice(0, 10);
  const endEdu = data?.more?.edu?.endEdu;
  const endE = endEdu?.slice(0, 10);

  const startQual = data?.more?.qual?.startQual;
  const startQ = startQual?.slice(0, 10);
  const endQual = data?.more?.qual?.endQual;
  const endQ = endQual?.slice(0, 10);
  console.log(data);
  return (
    <div className={m.container}>
      <div className={m.containerwrapper}>
        <ModifiedHeader isAdmin={isAdmin} />

        <div className={m.wrapper}>
          <h1 className={m.title}>Личный кабинет</h1>
          <div className={m.content}>
            <div className={m.bar}>
              <ProfileComponent data={data} />
              <ActivitySelector />
              <>
                <NavBar currentBtn={"Profile"} />
              </>
            </div>

            <div className={m.infoBar}>
              <div className={m.persWrapp}>
                <h3 className={m.infoTitle}>Профессиональная информация</h3>

                {data.more?.job?.post ? (
                  <div className={m.personalInfo}>
                    <h3 className={m.post}>{data.more?.job?.post}</h3>
                    <span className={m.postLevel}>
                      {data.more?.job?.postLevel}
                    </span>
                    <br />
                    <span className={m.lang}>
                      {data.more?.job?.lang}, {data.more?.job?.langLevel}
                    </span>
                  </div>
                ) : (
                  ""
                )}

                <div className={m.tagsWrapper}>
                  {data.more?.job?.skills.map((tag, i) => (
                    <SkillsComponent skills={tag} key={i} />
                  ))}
                </div>
              </div>

              {data.more?.exp ? (
                <div className={m.expWrapp}>
                  <h3 className={m.infoTitle}>Опыт работы</h3>

                  <div className={m.expInfo}>
                    <h3 className={m.postTitle}>{data.more?.exp?.jobPost}</h3>
                    <p className={m.companyWrapp}>
                      <span className={m.postLevel}>
                        {data.more?.exp?.company}
                      </span>
                      ,{" "}
                      <span className={m.date}>
                        {data.more?.exp?.startJob} - {data.more?.exp?.endJob}
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
                    <h3 className={m.eduTitle}>
                      {data.more?.edu?.specialization}
                    </h3>
                    <p className={m.instWrapp}>
                      <span className={m.postLevel}>
                        {data.more?.edu?.institution}
                      </span>
                      <br />
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
                  <h3 className={m.infoTitle}>
                    Курсы и повышение квалификации
                  </h3>

                  <div className={m.expInfo}>
                    <h3 className={m.eduTitle}>{data.more?.qual?.qualName}</h3>
                    <p className={m.instWrapp}>
                      <span className={m.postLevel}>
                        {data.more?.qual?.qualInstitution}
                      </span>
                      <br />
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
      </div>
    </div>
  );
}

export default Profile;
