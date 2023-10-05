import m from "./ProjectProfilePopup.module.css";
import baseImg from "../../../../assets/images/NotFound.svg";
import axios from "axios";

function ProjectProfilePopup({
  currentProjectData,
  isActiveProject,
  setIsActiveProject,
  setCurrentProjectData,
  setIsCurrentProjectAction
}) {
  const ID = JSON.parse(localStorage.getItem("userData"));
  const userId = ID?.userID;
  const data = currentProjectData;
  const nandleAccessVerefy = ({ id, config }) => {
    axios
      .put(`/api/${userId}/changeProjectVerefy`, { userID: id, config: config })
      .then((res) => {
        setCurrentProjectData(res.data)
        setIsCurrentProjectAction(config)
      });
  };

  return (
    <div
      className={isActiveProject ? m.active : m.default}
      onClick={() => setIsActiveProject(false)}
    >
      <div className={m.popup} onClick={(e) => e.stopPropagation()}>
        <div className={m.popupWrapper}>
          <div className={m.funcWrapper}>
            <div className={m.buttonWrapper}>
              <button
                className={data.isVerification === true ? m.notActive : m.btn}
                disabled={data.isVerification === true ? true : false}
                onClick={() =>
                  nandleAccessVerefy({ id: data._id, config: "access" })
                }
              >
                Подтверидить
              </button>
              <button
                className={data.isVerification === false ? m.notActive : m.btn}
                disabled={data.isVerification === false ? true : false}
                onClick={() =>
                  nandleAccessVerefy({ id: data._id, config: "deny" })
                }
              >
                Отклонить
              </button>
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
          <div className={m.projectContainer}>
            <div className={m.avatar}>
              <img
                className={
                  currentProjectData?.projectImage.length === 0
                    ? m.baseImg
                    : m.image
                }
                src={
                  currentProjectData?.projectImage
                    ? `http://startupseed.ru/${currentProjectData?.projectImage}`
                    : baseImg
                }
                alt=""
              />
            </div>
            <div className={m.infoWrapper}>
              <h4 className={m.title}>{currentProjectData?.projectName}</h4>
              <p className={m.description}>{currentProjectData?.projectDesc}</p>
            </div>
          </div>
          {currentProjectData?.projectPost?.length > 0 ? (
            <div className={m.positionContainer}>
              <div className={m.positionWrapper}>
                <h2 className={m.posTitle}>Открытые позиции</h2>
                {currentProjectData?.projectPost?.map((pos, i) => (
                  <div key={i} className={m.posContainer}>
                    <div className={m.posWrapper}>
                      <div className={m.posJobWrapper}>
                        <h3 className={m.jobPost}>{pos.jobPost}</h3>
                        <h3 className={m.jobPostLevel}>{pos.postLevel}</h3>
                      </div>
                      <p className={m.jobTask}>{pos.jobTask}</p>
                      <div className={m.skillsWrapper}>
                        {pos.skills.map((skills) => (
                          <div key={skills} className={m.skills}>
                            <h4 className={m.skillsTags}>{skills}</h4>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className={m.positionContainer}>
              <div className={m.positionWrapper}>
                <h2 className={m.posTitle}>Открытых позиций нет</h2>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectProfilePopup;
