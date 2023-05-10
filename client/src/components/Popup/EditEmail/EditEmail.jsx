// import { useState } from "react";
// import { useHttp } from "../../../hooks/http.hook";
import "./EditEmail.css";
import m from "./EditEmail.module.css";
import { useDispatch, useSelector } from "react-redux";
import { changeEmail } from "../../../redux/slices/popupSlice";
import { useState } from "react";

const EditEmail = () => {
  const isVisibleEmail = useSelector((state) => state.popup.visibleEmail);
  const [visible, setVisible] = useState(false);
  const inactive = "popup__change";
  const active = "popup__change_opened";
  const dispatch = useDispatch();
  const [email, setEmail] = useState({
    email: "",
    code: "",
  });

  const changeHandler = (event) => {
    setEmail({ ...email, [event.target.name]: event.target.value });
  };

  console.log(email);

  const handleVerefEmail = () => {
    console.log(email.email <= 4);
    if(email.email <= 4) {
      setVisible(false)
    } else {
      setVisible(true)
    }
  }

  const closePopup = () => {
    dispatch(changeEmail(true));
  };
  //   const { loading, request } = useHttp();
  // const [form, setForm] = useState({
  //   email: "",
  //   password: "",
  // });

  // const changeHandler = (event) => {
  //   setForm({ ...form, [event.target.name]: event.target.value });
  // };

  //   const loginHandler = async () => {
  //     try {
  //       const data = await request("/api/auth/login", "POST", { ...form });
  //       auth.login(data.token, data.userId);
  //     } catch (e) {}
  //   };

  return (
    <>
      <div
        className={isVisibleEmail ? active : inactive}
        onClick={() => closePopup()}
      >
        <div className={m.popup} onClick={(e) => e.stopPropagation()}>
          <div className={m.popupWrapper}>
            <div className={m.textWrapper}>
              <div className={m.titleWrapper}>
                <h2 className={m.title}>Смена почты</h2>
              </div>
              <p className={m.text}>
                На указанный вами адрес электронной почты будет выслано письмо с
                кодом подтверждения, который нужно будет ввести на следующем
                шаге.
              </p>
            </div>
            <form className={m.form}>
              <div className={m.formWrapper}>
                <input 
                  type="text"
                  placeholder="Email" 
                  name="email"
                  onChange={changeHandler}
                  className={m.input}
                />
                <br />
                {visible ? (
                  <input
                    type="text"
                    name="code"
                    placeholder="Код подтверждения"
                    onChange={changeHandler}
                    className={m.inputVeref}
                  />
                ) : (
                  ""
                )}
                <div className={m.btnWrapper}>
                  {visible ? (
                    <button type="button" className={m.btnVerif}>
                      Отправить код повторно
                    </button>
                  ) : (
                    <button type="button" onClick={() => handleVerefEmail()} className={m.btnVerif}>
                      Отправить код подтверждения
                    </button>
                  )}
                  <div>
                    <button className={m.btnSave} onClick={() => closePopup()}>
                      Изменить
                    </button>
                    <button
                      className={m.btnCancel}
                      onClick={() => closePopup()}
                    >
                      Отмена
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditEmail;
