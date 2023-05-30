import m from "./AboutWork.module.css";
// import PL from "../../assets/images/PolygonL.svg";
// import PR from "../../assets/images/PolygonR.svg";

function AboutWork() {
  return (
    <div className={m.container}>
      <div className={m.containerWrapper}>
        <div className={m.titleWrapp}>
          <p className={m.title}>
            <span className={m.span}>Startup seed</span> - быстрый запуск цифровых идей
          </p>
          <h3 className={m.text}>Как это работает?</h3>
        </div>
        
        <div className={m.content}>
          <div className={m.wrapper}>
            <div className={m.blockWrapp}>
              <h1 className={m.numb}>1</h1>
              <p className={m.numbText}>
                Зарегистрируйтесь и заполните профиль в личном
                кабинете
              </p>
            </div>
            <div className={m.blockWrapp}>
              <h1 className={m.numb}>2</h1>
              <p className={m.numbText}>
                Размещайте или
                находите интересные
                проекты
              </p>
            </div>
            <div className={m.blockWrapp}>
              <h1 className={m.numb}>3</h1>
              <p className={m.numbText}>
                Просоединяйтесь к команде
              </p>
            </div>
            <div className={m.blockWrapp}>
              <h1 className={m.numb}>4</h1>
              <p className={m.numbText}>Получайте ценность</p>
            </div>
          </div>
        </div>

        <button className={m.button}>Присоединиться</button>
      </div>
    </div>
  );
}

export default AboutWork;
