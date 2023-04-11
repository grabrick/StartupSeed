import arrowLeftIcon from "../../assets/images/arrow_left.svg";
import arrowRightIcon from "../../assets/images/arrow_right.svg";
import s from "./Slider.module.css";

function Slider() {
  return (
    <div className={s.slide}>
      <div className={s.content}>
        <h1 className={s.title}>
          <span className={s.titleSpan}>Наши</span> Резиденты
        </h1>
        <div className={s.container}>
          <img className={s.arrowLogo} src={arrowLeftIcon} alt="arrowLeft" />
          <div className={s.wrap}>
            <div className={s.square}></div>
            <h2 className={s.titleWrap}>Имя слайда</h2>
          </div>
          <div className={s.wrap}>
            <div className={s.square}></div>
            <h2 className={s.titleWrap}>Имя слайда</h2>
          </div>
          <div className={s.wrap}>
            <div className={s.square}></div>
            <h2 className={s.titleWrap}>Имя слайда</h2>
          </div>
          <div className={s.wrap}>
            <div className={s.square}></div>
            <h2 className={s.titleWrap}>Имя слайда</h2>
          </div>
          <img className={s.arrowLogo} src={arrowRightIcon} alt="arrowRight" />
        </div>
      </div>

      <div className={s.content}>
        <h1 className={s.title}>
          <span className={s.titleSpan}>Выпусники</span> ведущих вузов
        </h1>
        <div className={s.container}>
          <img className={s.arrowLogo} src={arrowLeftIcon} alt="arrowLeft" />
          <div className={s.wrap}>
            <div className={s.square}></div>
            <h2 className={s.titleWrap}>Имя слайда</h2>
          </div>
          <div className={s.wrap}>
            <div className={s.square}></div>
            <h2 className={s.titleWrap}>Имя слайда</h2>
          </div>
          <div className={s.wrap}>
            <div className={s.square}></div>
            <h2 className={s.titleWrap}>Имя слайда</h2>
          </div>
          <div className={s.wrap}>
            <div className={s.square}></div>
            <h2 className={s.titleWrap}>Имя слайда</h2>
          </div>
          <img className={s.arrowLogo} src={arrowRightIcon} alt="arrowRight" />
        </div>
      </div>
    </div>
  );
}

export default Slider;
