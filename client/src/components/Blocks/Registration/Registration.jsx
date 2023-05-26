import m from "./Registration.module.css";

function Registration() {
  return (
    <div className={m.container}>
      <div className={m.containerWrapper}>
        <div className={m.aboutWrapp}>
          <h1 className={m.title}>Регистрация</h1>
          <span className={m.lowTitle}>Регистрация</span>
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
            <button className={m.button}>Регистрация</button>
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

export default Registration;
