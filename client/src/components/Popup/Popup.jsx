import React, { useState } from "react";
import { Form, Field } from "react-final-form";
import "./Popup.css";

const Popup = ({ close }) => {
  const normalInput = "text-field__input-reg auth__main_input-bio";
  const errorInput = "text-field__input-reg__error auth__main_input-bio__error";
  const normalLable = "text-field__label-reg text-lable";
  const errorLable = "text-field__label-reg__error text-lable";
  const onSubmit = (e) => {};

  const validate = (e) => {
    const errors = {};

    if (e.FirstName && e.FirstName.length < 5) {
      errors.FirstName = "Too short";
    }

    if (e.LastName && e.LastName.length < 5) {
      errors.LastName = "Too short";
    }

    if (e.Email && e.Email.length < 5) {
      errors.Email = "Too short";
    }

    if (e.Pass && e.Pass.length < 5) {
      errors.Pass = "Too short";
    }

    if (e.repeatPass && e.repeatPass.length < 5) {
      errors.repeatPass = "Too short";
    }

    return errors;
  };
  const [popup] = useState(false);
  const inactive = "popup__register";
  const active = "popup__register_opened";

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
            <Form
              onSubmit={onSubmit}
              validate={validate}
              render={({ handleSubmit }) => (
                <form
                  onSubmit={handleSubmit}
                  className="popup__form"
                  name="edit-Profile"
                >
                  <div className="auth__main_register-input__user_wrapper">
                    <div className="auth__main_reg-input__user_wrapper">
                      {/* <p className="auth__main_reg-text">Регистрация</p> */}
                      <div className="text-field-reg text-field_floating-reg auth__main_input-email_wrapper">
                        <Field name="FirstName">
                          {({ input, meta }) => (
                            <>
                              <input
                                className={
                                  meta.error ? errorInput : normalInput
                                }
                                type="text"
                                {...input}
                                placeholder="name"
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
                        <Field name="LastName">
                          {({ input, meta }) => (
                            <>
                              <input
                                className={
                                  meta.error ? errorInput : normalInput
                                }
                                type="text"
                                {...input}
                                placeholder="Phone"
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
                        <Field name="Email">
                          {({ input, meta }) => (
                            <>
                              <input
                                className={
                                  meta.error ? errorInput : normalInput
                                }
                                type="text"
                                {...input}
                                placeholder="Phone"
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
                        <Field name="Pass">
                          {({ input, meta }) => (
                            <>
                              <input
                                className={
                                  meta.error ? errorInput : normalInput
                                }
                                type="text"
                                {...input}
                                placeholder="Phone"
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
                        <Field name="repeatPass">
                          {({ input, meta }) => (
                            <>
                              <input
                                className={
                                  meta.error ? errorInput : normalInput
                                }
                                type="text"
                                {...input}
                                placeholder="Phone"
                              />
                              <label
                                className={
                                  meta.error ? errorLable : normalLable
                                }
                              >
                                Повторить пароль
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
                      value="Register"
                      name="submit"
                    >
                      Register
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
