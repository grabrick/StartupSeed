import React, { useContext, useState } from "react";
import { useHttp } from "../../../hooks/http.hook";
import {AuthContext} from "../../../context/AuthContext";
import "./LoginPopup.css";

const Popup = ({ close }) => {
  // const normalInput = "text-field__input-reg auth__main_input-bio";
  // const errorInput = "text-field__input-reg__error auth__main_input-bio__error";
  // const normalLable = "text-field__label-reg text-lable";
  // const errorLable = "text-field__label-reg__error text-lable";
  const inactive = "popup__register";
  const active = "popup__register_opened";
  const [popup] = useState(false);
  const auth = useContext(AuthContext)
  const { loading, request } = useHttp();
  const [form, setForm] = useState({
      email: "",
      password: "",
  });

  const changeHandler = (event) => {
    setForm({...form, [event.target.name]: event.target.value})
}

const loginHandler = async () => {
  try {
      const data = await request("/api/auth/login", "POST", {...form})
      auth.login(data.token, data.userId)
  } catch (e) {
      
  }
}

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
                  <h2 className="popup__title">Login</h2>
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
                        type="text"
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
                </div>
                <button
                  type="submit"
                  className="popup__button_register-save"
                  value="Register"
                  name="submit"
                  onClick={loginHandler}
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
