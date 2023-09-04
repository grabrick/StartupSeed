import m from "./About.module.css";

function About() {
  return (
    <div className={m.container}>
      <div className={m.containerWrapper}>
        <div className={m.aboutWrapp}>
          <h1 className={m.title}>О платформе</h1>
          <span className={m.lowTitle}>О платформе</span>
        </div>
        <div className={m.aboutInfo}>
          <div className={m.wrappInfo}>
            <div className={m.wrappText}>
              <h1 className={m.about}>42</h1>
              <p className={m.smallAbout}>Лучших спикеров</p>
            </div>

            <div className={m.wrappText}>
              <h1 className={m.about}>60+</h1>
              <p className={m.smallAbout}>Стартапов и инсайтов</p>
            </div>

            <div className={m.wrappText}>
              <h1 className={m.about}>{">"}500</h1>
              <p className={m.smallAbout}>Полезных контактов</p>
            </div>

            <div className={m.wrappText}>
              <h1 className={m.about}>35</h1>
              <p className={m.smallAbout}>Часов потока информации</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
