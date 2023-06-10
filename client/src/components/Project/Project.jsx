import ModifiedHeader from "../Blocks/Header/ModifiedHeader/ModifiedHeader";
import m from "./Project.module.css";

function Project() {
  return (
    <div className={m.container}>
      <div className={m.containerwrapper}>
        <ModifiedHeader />

        <div className={m.navbarContainer}>
          <h1 className={m.title}>Проекты</h1>
          <div className={m.navbarWrapper}>
            <input className={m.findInput} placeholder="Должность" type="text" />
            <select
              className={m.selector}
              defaultValue="Любой"
              name="postLevel"
            >
              <option value="Любой">Любой</option>
              <option value="Junior">Junior</option>
              <option value="Middle">Middle</option>
              <option value="Senior">Senior</option>
              <option value="Lead">Lead</option>
            </select>
            <button className={m.findButton}>Найти</button>
            <button className={m.createButton}>Создать проект</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Project;
