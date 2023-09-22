import m from "./ProjectControl.module.css";
import baseImg from "../../../assets/images/NotFound.svg"

function ProjectControl({ items, setIsActiveProject, setCurrentProjectData }) {
  const handleMoveToProject = (item) => {
    setIsActiveProject(true);
    setCurrentProjectData(item);
  };

  return (
    <div className={m.link} onClick={() => handleMoveToProject(items)}>
      <div className={m.container}>
        <div className={m.wrapper}>
          <div className={m.projectContainer}>
            <div className={m.avatar}>
              <img
                className={m.image}
                src={
                  items?.projectImage
                    ? `http://startupseed.ru/${items?.projectImage}`
                    : baseImg
                }
                alt=""
              />
            </div>
            <div className={m.infoWrapper}>
              <h4 className={m.title}>{items?.projectName}</h4>
              <p className={m.description}>{items?.projectDesc}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectControl;
