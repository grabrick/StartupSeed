import Header from "../Header/Header";
import m from "./Intro.module.css";
import girl from "../../assets/images/girl.svg"

function Intro() {
  return (
    <>
      <div className={m.container}>
        <Header />
        <div className={m.wrapper}>
          <div className={m.wrapp}>
            <p className={m.title}>Придумайте собвственную идею!</p>
            <h1 className={m.discription}>
              Запусти свою <span className={m.span}>бизнес идею</span>
              <br /> найди свою команду
            </h1>
            <p className={m.text}>
              Расскажи нам о своей бизнесс идеии и мы поможем вам
              <br /> воплотить ваши идеии в реальность
            </p>
            <img src={girl} alt="" className={m.girl} />
          </div>

          <div className={m.wrappBtn}>
            <button className={m.button}>Смотреть</button>
            <p className={m.more}>Подробнее</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Intro;
