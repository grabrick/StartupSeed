import ModifiedHeader from "../../UI/Blocks/Header/ModifiedHeader/ModifiedHeader";
import baseImage from "../../../assets/images/NotFound.svg";
import m from "./WatchMyProject.module.css";

function WatchMyProject({ items, projectId, isAdmin }) {
  return (
    <div className={m.container}>
      <div className={m.wrapper}>
        <ModifiedHeader isAdmin={isAdmin} />

        <div className={m.project}>
          <div className={m.projectWrapper}>
            <div className={m.avatar}>
              <img
                className={m.image}
                src={items.projectImage ? items.projectImage : baseImage}
                alt=""
              />
            </div>
            <div className={m.textWrapper}>
              <h1 className={m.title}>{items.projectName}</h1>
              <p className={m.desc}>{items.projectDesc}</p>
            </div>
          </div>
          {items?.projectPost?.length > 0 ? (
            <div className={m.positionContainer}>
              <div className={m.positionWrapper}>
                <h2 className={m.posTitle}>Открытые позиции</h2>
                {items?.projectPost?.map((pos) => (
                  <div className={m.posContainer}>
                    <div className={m.posWrapper}>
                        <div className={m.jobPostWrapper}>
                            <h3 className={m.posJob}>{pos.jobPost}</h3>
                            <h3 className={m.posLevel}>{pos.postLevel}</h3>
                        </div>
                        <p className={m.posTask}>{pos.jobTask}</p>
                        <div className={m.skillsWrapper}>
                            {pos.skills.map((item, i) => (
                                <div className={m.skills} key={i}>
                                    <h4 className={m.skillsTags}>{item}</h4>
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

export default WatchMyProject;
