import m from "./AboutForm.module.css";
import React from "react";
import "./AboutForm.css";
import { Field, Form } from "react-final-form";
import axios from "axios";

function AboutForm() {
  const normalInputArea =
    "text-field__input-reg6 auth__main_input-name32 text-input__textarea";
  const errorInputArea =
    "text-field__input-reg_error auth__main_input-name_error text-input__textarea";
  const ID = JSON.parse(localStorage.getItem("userData"));
  const userId = ID.userID;

  const validate = (e) => {
    const errors = {};

    if (e.aboutMe && e.aboutMe.length < 50) {
      errors.aboutMe = "Напишите больше о своих достижениях";
    }

    return errors;
  };

  const onSubmit = async (value) => {
    axios.put(`/api/auth/${userId}/edit/about`, { ...value })
  };
  return (
    <div className={m.infoBar}>
      <div className={m.infoWrapp}>
        <h3 className={m.titleSmall}>О себе</h3>
        <Form
          onSubmit={onSubmit}
          validate={validate}
          render={({ handleSubmit }) => (
            <form className="popup__form6" onSubmit={handleSubmit}>
              <div className="auth__main_reg-input__user_wrapper6">
                <div className="text-field-reg6 text-field_floating-reg6 auth__main_input-email_wrapper6">
                  <Field name="aboutMe">
                    {({ input, meta }) => (
                      <>
                        <textarea
                          type="text"
                          placeholder="Опешите ваши задачи и достижения"
                          className={
                            meta.error ? errorInputArea : normalInputArea
                          }
                          {...input}
                        />
                        {meta.touched && meta.error && (
                          <span className="error-text3">{meta.error}</span>
                        )}
                      </>
                    )}
                  </Field>
                </div>
                <button
                  type="submit"
                  className="popup__button_register-save6"
                >
                  Сохранить
                </button>
              </div>
            </form>
          )}
        />
      </div>
    </div>
  );
}

export default AboutForm;
