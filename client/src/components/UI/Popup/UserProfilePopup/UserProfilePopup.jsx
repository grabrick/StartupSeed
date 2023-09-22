import axios from "axios";
import InfoComponent from "../../../WatchSpecialist/InfoComponent/InfoComponent";
import baseImage from '../../../../assets/images/NotFound.svg'
import m from "./UserProfilePopup.module.css";
const UserProfilePopup = ({
  isActiveProfile,
  setIsActiveProfile,
  currentProfileData,
  setCurrentProfileData,
  setIsCurrentAction,
}) => {
  const ID = JSON.parse(localStorage.getItem("userData"));
  const userId = ID?.userID;
  const data = currentProfileData;
  const hb = data?.more?.pers?.hb;
  const hbSlice = hb?.slice(0, 10);
  const hbSliced = hbSlice?.replace(/-/g, ".");
  const startEdu = data?.more?.edu?.startEdu;
  const startE = startEdu?.slice(0, 10);
  const endEdu = data?.more?.edu?.endEdu;
  const endE = endEdu?.slice(0, 10);

  const startQual = data?.more?.qual?.startQual;
  const startQ = startQual?.slice(0, 10);
  const endQual = data?.more?.qual?.endQual;
  const endQ = endQual?.slice(0, 10);

  const nandleAccessVerefy = ({id, config}) => {
    axios.put(`/api/${userId}/changeVerefy`, { userID: id, config: config })
      .then(res => {
        setCurrentProfileData(res.data)
        setIsCurrentAction(config)
      })
  }

  return (
    <div
      className={isActiveProfile ? m.active : m.default}
      onClick={() => setIsActiveProfile(false)}
    >
      <div className={m.popup} onClick={(e) => e.stopPropagation()}>
        <div className={m.funcWrapper}>
          <div className={m.btnWrapper}>
            <button className={data.isVerification === true ? m.notActive : m.btn} disabled={data.isVerification === true ? true : false} onClick={() => nandleAccessVerefy({ id: data._id, config: 'access'})}>Подтверидить</button>
            <button className={data.isVerification === false ? m.notActive : m.btn} disabled={data.isVerification === false ? true : false} onClick={() => nandleAccessVerefy({ id: data._id, config: 'deny'})}>Отклонить</button>
          </div>
          <>
            {data.isVerification === true ? (
              <div className={m.verifyWrapper}>
                <p className={m.verifyText}>Верефикация: </p>
                <p className={m.verifyTextAccess}>Пройдена</p>
              </div>
            ) : (
              <div className={m.verifyWrapper}>
                <p className={m.verifyText}>Верефикация: </p>
                <p className={m.verifyTextDeny}>Не пройдена</p>
              </div>
            )}
          </>
        </div>
        
        <div className={m.rowDisplay}>
          <div className={m.blankWrapper}>
            <div className={m.pesonalInfo}>
              <div className={m.nameWrapper}>
                <img
                  className={m.profilePic}
                  src={ data.more?.pers?.profilePic ? `http://startupseed.ru/${data.more?.pers?.profilePic}` : baseImage}
                  alt=""
                />
                <div className={m.nameWrapp}>
                  <p className={m.name}>{data?.fname}</p>
                  <p className={m.name}>{data?.lname}</p>
                </div>
                <div className={m.activeWrapper}>
                  <p className={m.isActive}>В поиске проекта</p>
                </div>
              </div>
              <div className={m.moreInfoWrapper}>
                {data.more?.pers?.gender || data.more?.pers?.hb ? (
                  <div className={m.maleWrapper}>
                    <p className={m.list}>
                      Пол:
                      <span className={m.info1}>
                        {data?.more?.pers?.gender}
                      </span>
                    </p>
                    <p className={m.list}>
                      Дата рождения:<span className={m.info2}>{hbSliced}</span>
                    </p>
                    <p className={m.list}>
                      Страна:
                      <span className={m.info3}>
                        {data?.more?.pers?.country}
                      </span>
                    </p>
                    <p className={m.list}>
                      Город:
                      <span className={m.info4}>{data?.more?.pers?.city}</span>
                    </p>
                    <p className={m.list}>
                      Телефон:
                      <span className={m.info4}>
                        {data?.phoneNumber ? data?.phoneNumber : "Не указан"}
                      </span>
                    </p>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className={m.jobInfoBlank}>
            <div className={m.jobBlank}>
              <InfoComponent items={data} />
            </div>
          </div>
        </div>
        <div className={m.otherBlanks}>
          <div className={m.otherBlanksWrapper}>
            <div className={m.Blank}>
              {data?.more?.exp === undefined ? (
                <div className={m.warningContainer}>
                  <h3 className={m.infoTitle}>Опыт работы</h3>
                  <div className={m.warningInfo}>
                    <h3 className={m.warningText}>Раздел не заполнен</h3>
                  </div>
                </div>
              ) : (
                <div className={m.expInfo}>
                  <h3 className={m.infoTitle}>Опыт работы</h3>
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
              )}
            </div>
            <div className={m.Blank}>
              {data?.more?.edu === undefined ? (
                <div className={m.warningContainer}>
                  <h3 className={m.infoTitle}>Образование</h3>
                  <div className={m.warningInfo}>
                    <h3 className={m.warningText}>Раздел не заполнен</h3>
                  </div>
                </div>
              ) : (
                <div className={m.expInfo}>
                  <h3 className={m.infoTitle}>Образование</h3>
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
              )}
            </div>
            <div className={m.Blank}>
              {data?.more?.qual === undefined ? (
                <div className={m.warningContainer}>
                  <h3 className={m.infoTitle}>
                    Курсы и повышение квалификации
                  </h3>
                  <div className={m.warningInfo}>
                    <h3 className={m.warningText}>Раздел не заполнен</h3>
                  </div>
                </div>
              ) : (
                <div className={m.expInfo}>
                  <h3 className={m.infoTitle}>
                    Курсы и повышение квалификации
                  </h3>
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
              )}
            </div>
            <div className={m.Blank}>
              {data?.more?.about === undefined ? (
                <div className={m.warningContainer}>
                  <h3 className={m.infoTitle}>О себе</h3>
                  <div className={m.warningInfo}>
                    <h3 className={m.warningText}>Раздел не заполнен</h3>
                  </div>
                </div>
              ) : (
                <div className={m.aboutInfo}>
                  <h3 className={m.infoTitle}>О себе</h3>
                  <p className={m.aboutText}>{data.more?.about?.aboutMe}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePopup;
