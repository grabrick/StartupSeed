import m from "./AboutWork.module.css";
// import PL from "../../assets/images/PolygonL.svg";
// import PR from "../../assets/images/PolygonR.svg";

function AboutWork() {
  return (
    <div className={m.container}>
      <div className={m.titleWrapp}>
        <p className={m.title}>
          <span className={m.span}>Startup seed</span> - быстрый запуск
          <br /> цифровых идей
        </p>
        <h3 className={m.text}>Как это работает?</h3>
      </div>

      <div className={m.wrapper}>
        <div className={m.blockWrapp}>
          <h1 className={m.numb}>1</h1>
          <p className={m.numbText}>
            Зарегистрируйтесь и<br /> заполните профиль в<br /> личном кабинете
          </p>
        </div>
        <div className={m.blockWrapp}>
          <h1 className={m.numb}>2</h1>
          <p className={m.numbText}>
            Размещайте или<br /> находите интересные<br /> проекты
          </p>
        </div>
        <div className={m.blockWrapp}>
          <h1 className={m.numb}>3</h1>
          <p className={m.numbText}>Просоединяйтесь к<br /> команде</p>
        </div>
        <div className={m.blockWrapp}>
          <h1 className={m.numb}>4</h1>
          <p className={m.numbText}>Получайте ценность</p>
        </div>
      </div>

      <button className={m.button}>Присоединиться</button>
    </div>
  );
}

export default AboutWork;
