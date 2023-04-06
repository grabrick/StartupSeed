import m from "./About.module.css";
import light from "../../assets/images/light.svg";
import poligon from "../../assets/images/Polygon 2.svg";

function About() {
  return (
    <div className={m.container}>
      <div className={m.aboutWrapp}>
        <h1 className={m.title}>О платформе</h1>
        <span className={m.lowTitle}>О платформе</span>
      </div>
      <div className={m.aboutInfo}>
        <div className={m.lightWrapper}>
          <p className={m.text}>
            Площадка для обмена опытом внутри<br /> профессионального бизнес -<br /> и
            диджитал - сообщества, встреча<br /> специалистов и потенциальных<br />
            заказчиков. Спикеры из самых крутых<br /> компании страны и только
            практики
          </p>
          <img src={light} alt="" />
        </div>
        <img src={poligon} alt="" />
      </div>
    </div>
  );
}

export default About;
