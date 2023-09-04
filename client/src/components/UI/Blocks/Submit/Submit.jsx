import m from "./Submit.module.css";

function Submit() {
  return (
    <div className={m.container}>
      <div className={m.containerWrapper}>
        <div className={m.aboutWrapp}>
          <h1 className={m.title}>Хочешь быть спикером?</h1>
          <p className={m.lowTitle}>
            Хочешь быть <span className={m.span}>спикером?</span>
          </p>
        </div>

        <div className={m.regWrapp}>
          <form className={m.formWrapper} action="">
            <input
              className={m.input}
              type="text"
              name=""
              id=""
              placeholder="Имя"
            />
            <input
              className={m.input}
              type="text"
              name=""
              id=""
              placeholder="E-mail"
            />
            <button className={m.button}>Оставить заявку</button>
          </form>
          <div className={m.textWrapper}>
            <p className={m.text}>
              Нажимая на кнопку регистрация вы даете согласия на обработку ваших
              данных
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Submit;
