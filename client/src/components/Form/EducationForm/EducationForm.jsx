import m from "./EducationForm.module.css";
import React from "react";
import "./EducationForm.css";
import { changeProf } from "../../../redux/slices/formSlice";
import { useDispatch } from "react-redux";
import { Field, Form } from "react-final-form";
import axios from "axios";

function EducationForm() {
  const normalInput = "text-field__input-reg4 auth__main_input-name4";
  const errorInput =
    "text-field__input-reg__error2 auth__main_input-name_error4";
  const normalLable = "text-field__label-reg4 text-lable2";
  const errorLable = "text-field__label-reg__error2 text-lable2";
  const normalInputDate = "text-field__input-reg4 auth__main_input-date4";
  const dispatch = useDispatch();

  const submit = () => {
    dispatch(changeProf(true));
  };

  const validate = (e) => {
    const errors = {};

    if (e.specialization && e.specialization.length < 5) {
      errors.specialization = "Слишком коротко";
    }

    if (e.institution && e.institution.length < 5) {
      errors.institution = "Слишком коротко";
    }

    if (e.progress && e.progress.length < 50) {
      errors.progress = "Напишите больше о своих достижений";
    }

    return errors;
  };

  const onSubmit = async (value) => {
    axios.put("/api/auth/edit/edu", { ...value })
  };
  return (
    <div className={m.infoBar}>
      <div className={m.infoWrapp}>
        <h3 className={m.titleSmall}>Образование</h3>
        <Form
          onSubmit={onSubmit}
          validate={validate}
          render={({ handleSubmit }) => (
            <form className="popup__form4" onSubmit={handleSubmit}>
              <div className="auth__main_reg-input__user_wrapper4">
                <div className="text-field-reg4 text-field_floating-reg4 auth__main_input-email_wrapper4">
                  <Field name="specialization">
                    {({ input, meta }) => (
                      <>
                        <input
                          type="text"
                          placeholder=" "
                          className={meta.error ? errorInput : normalInput}
                          {...input}
                        />
                        <label
                          className={meta.error ? errorLable : normalLable}
                        >
                          Специальность
                        </label>
                        {meta.touched && meta.error && (
                          <span className="error-text4">{meta.error}</span>
                        )}
                      </>
                    )}
                  </Field>
                </div>
                <div className="text-field-reg4 text-field_floating-reg4 auth__main_input-email_wrapper4">
                  <Field name="institution">
                    {({ input, meta }) => (
                      <>
                        <input
                          type="text"
                          placeholder=" "
                          className={meta.error ? errorInput : normalInput}
                          {...input}
                        />
                        <label
                          className={meta.error ? errorLable : normalLable}
                        >
                          Учебное заведение
                        </label>
                        {meta.touched && meta.error && (
                          <span className="error-text4">{meta.error}</span>
                        )}
                      </>
                    )}
                  </Field>
                </div>
                <div className={m.inputWrapper}>
                  <div className="text-field-reg4 text-field_floating-reg4 auth__main_input-email_wrapper4">
                    <Field name="startEdu">
                      {({ input, meta }) => (
                        <>
                          <input
                            type="date"
                            placeholder=" "
                            className={
                              meta.error ? errorInput : normalInputDate
                            }
                            {...input}
                          />
                          <label
                            className={meta.error ? errorLable : normalLable}
                          >
                            Начало обучения
                          </label>
                        </>
                      )}
                    </Field>
                  </div>
                  <div className="text-field-reg4 text-field_floating-reg4 auth__main_input-email_wrapper4">
                    <Field name="endEdu">
                      {({ input, meta }) => (
                        <>
                          <input
                            type="date"
                            placeholder=" "
                            className={
                              meta.error ? errorInput : normalInputDate
                            }
                            {...input}
                          />
                          <label
                            className={meta.error ? errorLable : normalLable}
                          >
                            Окончание обучения
                          </label>
                        </>
                      )}
                    </Field>
                  </div>
                </div>
                <div className={m.buttonWrapper}>
                  <button
                    type=""
                    className="popup__button_register-cancel4"
                    name="submit"
                    onClick={() => submit()}
                  >
                    Отмена
                  </button>
                  <button
                    type="submit"
                    className="popup__button_register-save4"
                    name="submit"
                  >
                    Сохранить
                  </button>
                </div>
              </div>
            </form>
          )}
        />
      </div>
    </div>
  );
}

export default EducationForm;
