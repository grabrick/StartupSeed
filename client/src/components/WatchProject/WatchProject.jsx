import ModifiedHeader from "../Blocks/Header/ModifiedHeader/ModifiedHeader";
import PositionProject from "./PositionProject/PositionProject";
import m from "./WatchProject.module.css";

function WatchProject({ items, projectId }) {
  return (
    <div className={m.container}>
      <div className={m.wrapper}>
        <ModifiedHeader />

        <div className={m.project}>
          <div className={m.projectWrapper}>
            <div className={m.avatar}>
              <img
                className={m.image}
                src={items.projectImage}
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
                        <PositionProject item={pos} projectId={projectId} />
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

export default WatchProject;
