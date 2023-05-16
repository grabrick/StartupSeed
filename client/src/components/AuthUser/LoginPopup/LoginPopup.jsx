import React, { useContext, useState } from "react";
import { useHttp } from "../../../hooks/http.hook";
import { AuthContext } from "../../../context/AuthContext";
import { Form, Field } from "react-final-form";
import "./LoginPopup.css";

const Popup = ({ close }) => {
  const normalInput = "text-field__input-reg auth__main_input-bio";
  const errorInput = "text-field__input-reg__error auth__main_input-bio__error";
  const normalLable = "text-field__label-reg text-lable";
  const errorLable = "text-field__label-reg__error text-lable";
  const inactive = "popup__register";
  const active = "popup__register_opened";
  const [popup] = useState(false);
  const auth = useContext(AuthContext);
  const { loading, request } = useHttp();

  const validate = (e) => {
    const errors = {};

    if (e.email?.indexOf("@") ===  -1) {
      errors.email = "В поле email должен быть знак @"
    } else if (e.email && e.email.length < 10) {
      errors.email = "Слишком короткая почта"
    }
  
    if (e.password && e.password.length < 5) {
      errors.password = "Пароль должен содержать минимум 5 символов";
    }

    return errors;
  };

  const onSubmit = async (value) => {
    try {
      const data = await request("/api/auth/login", "POST", { ...value });
      console.log(data);
      auth.login(data.token, data.userId);
    } catch (e) {}
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
                  <h2 className="popup__title">Вход</h2>
                </div>
              </div>
            </div>
            <Form
              onSubmit={onSubmit}
              validate={validate}
              render={({ handleSubmit }) => (
                <form
                  onSubmit={handleSubmit}
                  className="popup__form"
                >
                  <div className="auth__main_register-input__user_wrapper">
                    <div className="auth__main_reg-input__user_wrapper">
                      <div className="text-field-reg text-field_floating-reg auth__main_input-email_wrapper">
                        <Field name="email">
                          {({ input, meta }) => (
                            <>
                              <input
                                type="text"
                                placeholder=" "
                                className={
                                  meta.error ? errorInput : normalInput
                                }
                                {...input}
                              />
                              <label
                                className={
                                  meta.error ? errorLable : normalLable
                                }
                              >
                                Email
                              </label>
                              {meta.touched && meta.error && (
                                 <span className="error-text">{meta.error}</span>
                               )}
                            </>
                          )}
                        </Field>
                      </div>
                      <div className="text-field-reg text-field_floating-reg auth__main_input-email_wrapper">
                        <Field name="password">
                          {({ input, meta }) => (
                            <>
                              <input
                                type="text"
                                placeholder=" "
                                className={
                                  meta.error ? errorInput : normalInput
                                }
                                {...input}
                              />
                              <label
                                className={
                                  meta.error ? errorLable : normalLable
                                }
                              >
                                Пароль
                              </label>
                              {meta.touched && meta.error && (
                                 <span className="error-text">{meta.error}</span>
                               )}
                            </>
                          )}
                        </Field>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="popup__button_register-save"
                      name="submit"
                      disabled={loading}
                    >
                      Войти
                    </button>
                  </div>
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
