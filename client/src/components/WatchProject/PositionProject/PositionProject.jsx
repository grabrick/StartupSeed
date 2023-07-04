import m from "./PositionProject.module.css";

function PositionProject({ item }) {
  return (
    <div className={m.container}>
      <div className={m.wrapper}>
        <h2 className={m.postTitle}>
          {item?.jobPost},{" "}
          <span className={m.postLevel}>{item?.postLevel}</span>
        </h2>
        <p className={m.postDesc}>{item?.jobTask}</p>
        <div className={m.buttonWrapper}>
          <button className={m.addFavorite}>Добавить в избранное</button>
          <button className={m.addMessage}>Откликнуться</button>
        </div>
      </div>
    </div>
  );
}

export default PositionProject;
