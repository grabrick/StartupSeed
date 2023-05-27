import React, { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { Form, Field } from "react-final-form";
import eyeOpen from "../../../assets/images/eye-line.svg";
import eyeClose from "../../../assets/images/eye-off-line.svg";
import m from "./LoginPopup.module.css";
import "./LoginPopup.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { activeLogin } from "../../../redux/slices/popupSlice";

const LoginPopup = () => {
  const isVisibleLogin = useSelector((state) => state.popup.visibleLogin);
  const auth = useContext(AuthContext);
  const dispatch = useDispatch();
  const [currentPas, setCurrentPas] = useState(false);
  const normalInput = `${m.Input}`;
  const errorInput = `${m.InputError}`;
  const normalInputPassword = `${m.InputPass}`;
  const errorInputPassword = `${m.InputErrorPass}`;
  const inactive = "popup";
  const active = "popupOpen";

  const validate = (e) => {
    const errors = {};

    if (e.email?.indexOf("@") === -1) {
      errors.email = "В поле email должен быть знак @";
    } else if (e.email && e.email.length < 10) {
      errors.email = "Слишком короткая почта";
    }

    if (e.password && e.password.length < 5) {
      errors.password = "Пароль должен содержать минимум 5 символов";
    }

    return errors;
  };

  const showPassword = () => {
    setCurrentPas(true);
    if (currentPas === true) {
      setCurrentPas(false);
    }
  };

  const closePopup = () => {
    dispatch(activeLogin(false));
  };

  const onSubmit = async (value) => {
    axios.post("/api/auth/login", { ...value }).then((response) => {
      const login = response.data;
      console.log(login);
      auth.login(login.token, login.userID);
    });
  };

  return (
    <>
      <div
        className={isVisibleLogin ? inactive : active}
        onClick={() => closePopup()}
      >
        <div className={m.popup} onClick={(e) => e.stopPropagation()}>
          <div className={m.popupWrapper}>
            <div className={m.titleWrapper}>
              <h2 className={m.title}>Вход</h2>
            </div>
            <Form
              onSubmit={onSubmit}
              validate={validate}
              render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit} className={m.form}>
                  <div className={m.formWrapper}>
                    <div className={m.inputWrapper}>
                      <Field name="email">
                        {({ input, meta }) => (
                          <>
                            <input
                              type="text"
                              placeholder="Email"
                              className={meta.error ? errorInput : normalInput}
                              {...input}
                            />
                            {meta.touched && meta.error && (
                              <span className="error-text">{meta.error}</span>
                            )}
                          </>
                        )}
                      </Field>
                    </div>
                    <div className={m.inputWrapper}>
                      <Field name="password">
                        {({ input, meta }) => (
                          <>
                            <img
                              src={currentPas ? eyeOpen : eyeClose}
                              onClick={() => showPassword()}
                              className={m.eye}
                              alt=""
                            />
                            <input
                              type={currentPas ? "text" : "password"}
                              placeholder="Пароль"
                              className={
                                meta.error
                                  ? errorInputPassword
                                  : normalInputPassword
                              }
                              {...input}
                            />
                            {meta.touched && meta.error && (
                              <span className="error-text">{meta.error}</span>
                            )}
                          </>
                        )}
                      </Field>
                    </div>
                  </div>
                  <button type="submit" className={m.loginButton}>
                    Войти
                  </button>
                </form>
              )}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPopup;
