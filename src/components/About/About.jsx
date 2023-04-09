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
            Площадка для обмена опытом внутри
            <br /> профессионального бизнес -<br /> и диджитал - сообщества,
            встреча
            <br /> специалистов и потенциальных
            <br />
            заказчиков. Спикеры из самых крутых
            <br /> компании страны и только практики
          </p>
          <img src={light} alt="" />
        </div>
        
        <div className={m.wrappInfo}>
          <div className={m.wrappText}>
            <h1 className={m.about}>42</h1>
            <p className={m.smallAbout}>Лучших<br /> спикеров</p>
          </div>

          <div className={m.wrappText}>
            <h1 className={m.about}>60+</h1>
            <p className={m.smallAbout}>Стартапов<br /> и инсайтов</p>
          </div>

          <div className={m.wrappText}>
            <h1 className={m.about}>{">"}500</h1>
            <p className={m.smallAbout}>Полезных<br /> контактов</p>
          </div>

          <div className={m.wrappText}>
            <h1 className={m.about}>35</h1>
            <p className={m.smallAbout}>Часов потока<br /> информации</p>
          </div>
        </div>
        <img className={m.poligon} src={poligon} alt="" />
      </div>
    </div>
  );
}

export default About;
