import m from "./InfoComponent.module.css";

function InfoComponent({ items }) {
  return (
    <div className={m.container}>
      <div className={m.wrapper}>
        <h3 className={m.title}>Профессиональная информация</h3>
        <div className={m.profInfo}>
          <h2 className={m.post}>{items?.more?.job?.post}</h2>
          <p className={m.postLevel}>{items?.more?.job?.postLevel}</p>
          <p className={m.lang}>
            {items?.more?.job?.lang},{" "}
            <span className={m.langLevel}>{items?.more?.job?.langLevel}</span>
          </p>

          <div className={m.skillsWrapper}>
            {items?.more?.job?.skills?.map((tag, index) => (
              <div key={index} className={m.tags}>
                <span className={m.tag}>{tag}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoComponent;
