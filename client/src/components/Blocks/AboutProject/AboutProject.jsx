import m from "./AboutProject.module.css";

function AboutProject() {
  return (
    <div className={m.container}>
      <div className={m.containerWrapper}>
        <div className={m.titleWrapp}>
          <p className={m.textTitle}>Для кого эта платформа</p>
          <h1 className={m.title}>
            Для кого этот <span className={m.span}>проект</span>
          </h1>
        </div>

        <div className={m.wrapper}>
          <div className={m.element}>
            <div className={m.elementWrapper}>
              <h1 className={m.numb}>01</h1>
              <p className={m.numbText}>Для предпринимателей</p>
              <p className={m.smallNumbText}>
                которые хотят найти крутых
                <br /> специалистов
              </p>
            </div>
          </div>
          <div className={m.element}>
            <div className={m.elementWrapper}>
              <h1 className={m.numb}>02</h1>
              <p className={m.numbText}>Для владельцев бизнеса</p>
              <p className={m.smallNumbText}>
                которые хотят увеличить поток
                <br /> звонков новыми интсрументами
              </p>
            </div>
          </div>
          <div className={m.element}>
            <div className={m.elementWrapper}>
              <h1 className={m.numb}>03</h1>
              <p className={m.numbText}>Для блогеров и фрилансеров</p>
              <p className={m.smallNumbText}>
                которые хотят развивать свой
                <br /> блог и вырваться вперед
              </p>
            </div>
          </div>
          <div className={m.element}>
            <div className={m.elementWrapper}>
              <h1 className={m.numb}>04</h1>
              <p className={m.numbText}>
                Для специалистов, которые
                <br /> хотят узнать свежие функции
                <br /> и кейсы для продвижения
              </p>
            </div>
          </div>
          <div className={m.element}>
            <div className={m.elementWrapper}>
              <h1 className={m.numb}>05</h1>
              <p className={m.numbText}>
                Для студентов ищуших себя
                <br /> и всем, кто считает, что за
                <br /> IT будущее
              </p>
            </div>
          </div>
          <div className={m.element}>
            <div className={m.elementWrapper}>
              <h1 className={m.numb}>06</h1>
              <p className={m.numbText}>
                Для тех, кто хочет провести
                <br /> целый день в digital - тусовке
                <br /> общаясь на одном языке
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutProject;
