import m from "./Aboutinfo.module.css";

function AboutInfo() {
  return (
    <div className={m.container}>
      <div className={m.containerWrapper}>
        <div className={m.titleWrapp}>
          <p className={m.title}>
            <span className={m.span}>Startup seed</span> - твой быстрый
            каръерный эсколатор
          </p>
          <h3 className={m.text}>Как это работает для молодых специалистов</h3>
        </div>

        <div className={m.blockWrapper}>
          <p className={m.blockText}>Зарегестрируйся</p>
          <p className={m.blockText}>Найди проект</p>
          <p className={m.blockText}>Прояви себя</p>
          <p className={m.blockText}>Получи ведущую должность</p>
        </div>

        <div className={m.wrapper}>
          <div className={m.blockWrapp}>
            <h1 className={m.numb}>1</h1>
            <ol className={m.numbWrapp}>
              <li value="1" className={m.numbText}>
                Зарегестрируйся на
                <br /> платформе Укажи свои навыки
              </li>
              <li value="2" className={m.numbText}>
                Укажи свои навыки
              </li>
            </ol>
          </div>
          <div className={m.blockWrapp}>
            <h1 className={m.numb}>2</h1>
            <ol className={m.numbWrapp}>
              <li value="1" className={m.numbText}>
                Найди проект.
              </li>
              <li value="2" className={m.numbText}>
                Выбери свой проект и<br /> направление по которому
                <br /> хочешь развиваться
              </li>
            </ol>
          </div>
          <div className={m.blockWrapp}>
            <h1 className={m.numb}>3</h1>
            <ol className={m.numbWrapp}>
              <li value="1" className={m.numbText}>
                Прояви себя!
              </li>
              <li value="2" className={m.numbText}>
                Раскрой свой потенциал и<br /> докажи всем на что ты
                <br /> способен
              </li>
            </ol>
          </div>
          <div className={m.blockWrapp}>
            <h1 className={m.numb}>4</h1>
            <ol className={m.numbWrapp}>
              <li value="1" className={m.numbText}>
                Пройди практику
              </li>
              <li value="2" className={m.numbText}>
                Займи достойное место в<br /> быстроразвивающих проектах
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutInfo;
