import { useState } from "react";
import { useHttp } from "../../../hooks/http.hook";
import "./EditEmail.css";
import m from "./EditEmail.module.css";

const EditEmail = ({ close }) => {
  // const normalInput = "text-field__input-reg auth__main_input-bio";
  // const errorInput = "text-field__input-reg__error auth__main_input-bio__error";
  // const normalLable = "text-field__label-reg text-lable";
  // const errorLable = "text-field__label-reg__error text-lable";
  const inactive = "popup__change";
  const active = "popup__change_opened";
  const [popup] = useState(false);
  //   const { loading, request } = useHttp();
  //   const [form, setForm] = useState({
  //     email: "",
  //     password: "",
  //   });

  //   const changeHandler = (event) => {
  //     setForm({ ...form, [event.target.name]: event.target.value });
  //   };

  //   const loginHandler = async () => {
  //     try {
  //       const data = await request("/api/auth/login", "POST", { ...form });
  //       auth.login(data.token, data.userId);
  //     } catch (e) {}
  //   };

  return (
    <>
      <div className={popup ? active : inactive} onClick={() => close(false)}>
        <div className={m.popup} onClick={(e) => e.stopPropagation()}>
          <div className={m.popupWrapper}>
            <div className={m.textWrapper}>
              <div className={m.titleWrapper}>
                <h2 className={m.title}>Смена почты</h2>
              </div>
              <p className={m.text}>
                На указанный вами адрес электронной почты будет<br/> выслано письмо с
                кодом подтверждения, который<br/> нужно будет ввести на следующем
                шаге.
              </p>
            </div>
            <form className={m.form}>
              <div className={m.formWrapper}>
                <input type="text" placeholder="Email" className={m.input} /><br/>
                <button type="submit" className={m.btnSave}>
                  Сохранить
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditEmail;
