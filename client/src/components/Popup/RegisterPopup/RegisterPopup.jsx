import React, { useContext, useState } from "react";
import { useHttp } from "../../../hooks/http.hook";
import "./RegisterPopup.css";
import { Form, Field } from "react-final-form";
import { AuthContext } from "../../../context/AuthContext";

const Popup = ({ close }) => {
  const normalInput = "text-field__input-reg auth__main_input-bio";
  const errorInput = "text-field__input-reg__error auth__main_input-bio__error";
  const normalInputEmail = "text-field__input-reg auth__main_input-email";
  const errorInputEmail = "text-field__input-reg__error auth__main_input-email__error";
  const normalLable = "text-field__label-reg text-lable";
  const errorLable = "text-field__label-reg__error text-lable";
  const inactive = "popup__register";
  const active = "popup__register_opened";
  const auth = useContext(AuthContext)
  const [popup] = useState(false);
  const { loading, request } = useHttp();
  // const [formL, setFormL] = useState({
  //   email: "",
  //   password: "",
  // });
  // const [form, setForm] = useState({
  //     fname: "",
  //     lname: "",
  //     email: "",
  //     password: "",
      
  // });

//   const changeHandler = (event) => {
//     setForm({...form, [event.target.name]: event.target.value})
//     setFormL({...form, [event.target.name]: event.target.value})
// }

//   const registerHandler = async () => {
//     try {
//       const data = await request("/api/auth/register", "POST", { ...form });
//       const login = await request("/api/auth/login", "POST", {...formL})
//       auth.login(login.token, login.userId)
//       console.log("Data", data);
//     } catch (e) {
//       console.log(e);
//     }
//   };

const validate = (e) => {
  const errors = {};

  if (e.fname && e.fname.length < 5) {
    errors.fname = "Слишком короткое имя";
  }

  if (e.lname && e.lname.length < 5) {
    errors.lname = "Слишком короткая фамилия";
  }

  if (e.email?.indexOf("@") ===  -1) {
    errors.email = "В поле email должен быть знак @"
  } else if (e.email && e.email.length < 10) {
    errors.email = "Слишком короткая почта"
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
  console.log({email: value.email});
  try {
    if (value.password === value.repeatPassword) {
      const data = await request("/api/auth/register", "POST", { fname: value.fname, lname: value.lname, email: value.email, password: value.password });
      const login = await request("/api/auth/login", "POST", { email: value.email, password: value.password });
      auth.login(login.token, login.userId);
      console.log(data); 
    }
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
                  <h2 className="popup__title">Регистрация</h2>
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
                        <Field name="fname">
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
                                Имя
                              </label>
                              {meta.touched && meta.error && (
                                 <span className="error-text">{meta.error}</span>
                               )}
                            </>
                          )}
                        </Field>
                      </div>
                      <div className="text-field-reg text-field_floating-reg auth__main_input-email_wrapper">
                        <Field name="lname">
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
                                Фамилия
                              </label>
                              {meta.touched && meta.error && (
                                 <span className="error-text">{meta.error}</span>
                               )}
                            </>
                          )}
                        </Field>
                      </div>
                      <div className="text-field-reg text-field_floating-reg auth__main_input-email_wrapper">
                        <Field name="email">
                          {({ input, meta }) => (
                            <>
                              <input
                                type="text"
                                placeholder=" "
                                className={
                                  meta.error ? errorInputEmail : normalInputEmail
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
                      <div className="text-field-reg text-field_floating-reg auth__main_input-email_wrapper">
                        <Field name="repeatPassword">
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
                                Повтор пароля
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
                      Регистрация
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
