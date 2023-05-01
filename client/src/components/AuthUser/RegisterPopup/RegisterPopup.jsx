import React, { useContext, useState } from "react";
import { useHttp } from "../../../hooks/http.hook";
import "./RegisterPopup.css";
import { AuthContext } from "../../../context/AuthContext";

const Popup = ({ close }) => {
  // const normalInput = "text-field__input-reg auth__main_input-bio";
  // const errorInput = "text-field__input-reg__error auth__main_input-bio__error";
  // const normalLable = "text-field__label-reg text-lable";
  // const errorLable = "text-field__label-reg__error text-lable";
  const auth = useContext(AuthContext)
  const inactive = "popup__register";
  const active = "popup__register_opened";
  const [popup] = useState(false);
  const { loading, request } = useHttp();
  const [formL, setFormL] = useState({
    email: "",
    password: "",
});
  const [form, setForm] = useState({
      fname: "",
      lname: "",
      email: "",
      password: "",
      
  });

  const changeHandler = (event) => {
    setForm({...form, [event.target.name]: event.target.value})
    setFormL({...form, [event.target.name]: event.target.value})
}

  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", { ...form });
      const login = await request("/api/auth/login", "POST", {...formL})
      auth.login(login.token, login.userId)
      console.log("Data", data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className={popup ? active : inactive} onClick={() => close(false)}>
        <div
          className="auth__popup_register_container"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="popup__register_container-wrapper">
            <div className="auth__popup_register-wrapp_fixed">
              <div className="auth__popup_register-wrapper">
                <div className="auth__popup_wrapp-wrapper">
                  <h2 className="popup__title">Register</h2>
                </div>
              </div>
            </div>
            <form className="popup__form" name="register">
              <div className="auth__main_register-input__user_wrapper">
                <div className="auth__main_reg-input__user_wrapper">
                  <div className="text-field-reg text-field_floating-reg auth__main_input-email_wrapper">
                  <input
                        type="text"
                        placeholder="name"
                        id="name"
                        name="fname"
                        className="text-field__input-reg auth__main_input-name"
                        onChange={changeHandler}
                      />
                      <label className="text-field__label-reg text-lable">
                        Имя
                      </label>
                  </div>
                  <div className="text-field-reg text-field_floating-reg auth__main_input-email_wrapper">
                  <input
                        type="text"
                        placeholder="name"
                        id="name"
                        name="lname"
                        className="text-field__input-reg auth__main_input-name"
                        onChange={changeHandler}
                      />
                      <label className="text-field__label-reg text-lable">
                        Фамилия
                      </label>
                  </div>
                  <div className="text-field-reg text-field_floating-reg auth__main_input-email_wrapper">
                  <input
                        type="email"
                        placeholder="name"
                        id="name"
                        name="email"
                        className="text-field__input-reg auth__main_input-name"
                        onChange={changeHandler}
                      />
                      <label className="text-field__label-reg text-lable">
                        Email
                      </label>
                  </div>
                  <div className="text-field-reg text-field_floating-reg auth__main_input-email_wrapper">
                  <input
                        type="password"
                        placeholder="name"
                        id="name"
                        name="password"
                        className="text-field__input-reg auth__main_input-name"
                        onChange={changeHandler}
                      />
                      <label className="text-field__label-reg text-lable">
                        Пароль
                      </label>
                  </div>
                  {/* <div className="text-field-reg text-field_floating-reg auth__main_input-email_wrapper">
                  <input
                        type="text"
                        placeholder="name"
                        id="name"
                        name="RepeatPassword"
                        className="text-field__input-reg auth__main_input-name"
                        // onChange={changeHandler}
                      />
                      <label className="text-field__label-reg text-lable">
                        Повторите пароль
                      </label>
                  </div> */}
                </div>
                <button
                  type="submit"
                  className="popup__button_register-save"
                  value="Register"
                  name="submit"
                  onClick={registerHandler}
                  disabled={loading}
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Popup;
