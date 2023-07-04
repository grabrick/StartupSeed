import ModifiedHeader from "../Blocks/Header/ModifiedHeader/ModifiedHeader";
import PositionProject from "./PositionProject/PositionProject";
import m from "./WatchProject.module.css";

function WatchProject({ items }) {
  return (
    <div className={m.container}>
      <div className={m.wrapper}>
        <ModifiedHeader />

        <div className={m.project}>
          <div className={m.projectWrapper}>
            <div className={m.avatar}>
              <img
                className={m.image}
                src={items.more?.pers?.projectImage}
                alt=""
              />
            </div>
            <div className={m.textWrapper}>
              <h1 className={m.title}>{items.projectName}</h1>
              <p className={m.desc}>{items.projectDesc}</p>
            </div>
          </div>
          {items?.projectPost ? (
            <div className={m.positionContainer}>
                <div className={m.positionWrapper}>
                    <h2 className={m.posTitle}>Открытые позиции</h2>
                    {items?.projectPost?.map((pos) => (
                        <PositionProject item={pos} />
                    ))}
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

export default WatchProject;
