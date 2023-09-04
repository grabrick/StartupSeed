import React, { useContext, useState } from "react";
import { Form, Field } from "react-final-form";
import { AuthContext } from "../../../../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { activeRegister } from "../../../../redux/slices/popupSlice";
import axios from "axios";
import "./RegisterPopup.css";
import m from "./RegisterPopup.module.css";
import eyeOpen from "../../../../assets/images/eye-line.svg";
import eyeClose from "../../../../assets/images/eye-off-line.svg";

const Popup = () => {
  const normalInput = `${m.Input}`;
  const errorInput = `${m.InputError}`;
  const normalInputPassword = `${m.InputPass}`;
  const errorInputPassword = `${m.InputErrorPass}`;
  // const normalInputEmail = `${m.InputEmail}`;
  // const errorInputEmail = `${m.InputErrorEmail}`;
  const inactive = "popup";
  const active = "popupOpen";
  const isVisibleRegister = useSelector((state) => state.popup.visibleRegister);
  const dispatch = useDispatch();
  const [currentPas, setCurrentPas] = useState(false);
  const auth = useContext(AuthContext);

  const showPassword = () => {
    setCurrentPas(true);
    if (currentPas === true) {
      setCurrentPas(false);
    }
  };

  const closePopup = () => {
    dispatch(activeRegister(false));
  };

  const validate = (e) => {
    const errors = {};

    if (e.fname && e.fname.length < 5) {
      errors.fname = "Слишком короткое имя";
    }

    if (e.lname && e.lname.length < 5) {
      errors.lname = "Слишком короткая фамилия";
    }

    if (e.email?.indexOf("@") === -1) {
      errors.email = "В поле email должен быть знак @";
    } else if (e.email && e.email.length < 10) {
      errors.email = "Слишком короткая почта";
    }

    if (e.password && e.password.length < 5) {
      errors.password = "Пароль должен содержать минимум 5 символов";
    }

    if (e.password !== e.repeatPassword) {
      errors.repeatPassword = "Пароль не совпадает";
    }

    return errors;
  };

  const onSubmit = async (value) => {
    if (value.password === value.repeatPassword) {
      axios
        .post("/api/auth/register", {
          fname: value.fname,
          lname: value.lname,
          email: value.email,
          password: value.password,
        })
        .then((response) => {
          if (response.status === 201) {
            axios
              .post("/api/auth/login", {
                email: value.email,
                password: value.password,
              })
              .then((response) => {
                const login = response.data;
                auth.login(login.token, login.userID);
              });
          }
        });
    }
  };

  return (
    <>
      <div
        className={isVisibleRegister ? inactive : active}
        onClick={() => closePopup()}
      >
        <div className={m.popup} onClick={(e) => e.stopPropagation()}>
          <div className={m.popupWrapper}>
            <div className={m.titleWrapper}>
              <h2 className={m.title}>Регистрация</h2>
            </div>
            <Form
              onSubmit={onSubmit}
              validate={validate}
              render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit} className={m.form}>
                  <div className={m.formWrapper}>
                    <div className={m.inputWrapper}>
                      <Field name="fname">
                        {({ input, meta }) => (
                          <>
                            <input
                              type="text"
                              placeholder="Имя"
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
                      <Field name="lname">
                        {({ input, meta }) => (
                          <>
                            <input
                              type="text"
                              placeholder="Фамилия"
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
                    <div className={m.inputWrapperEmail}>
                      <Field name="email">
                        {({ input, meta }) => (
                          <>
                            <input
                              type="text"
                              placeholder="Email"
                              className={
                                meta.error ? errorInput : normalInput
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
                    <div className={m.inputWrapper}>
                      <Field name="repeatPassword">
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
                              placeholder="Повтор пароля"
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
                    Регистрация
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

export default Popup;
