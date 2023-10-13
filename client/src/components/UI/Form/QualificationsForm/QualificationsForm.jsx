import m from "./QualificationsForm.module.css";
import React, { useState } from "react";
import "./QualificationsForm.css";
import { changeQual } from "../../../../redux/slices/formSlice";
import { useDispatch } from "react-redux";
import { Field, Form } from "react-final-form";
import axios from "axios";

function QualificationsForm({userData}) {
  const normalInput = "text-field__input-reg5 auth__main_input-name5";
  const errorInput =
    "text-field__input-reg__error2 auth__main_input-bio__error5";
  const normalLable = "text-field__label-reg5 text-lable5";
  const errorLable = "text-field__label-reg__error5 text-lable2";
  const normalInputDate = "text-field__input-reg5 auth__main_input-date5";
  const errorInputDate =
    "text-field__input-reg_error5 auth__main_input-date_error5";
  const ID = JSON.parse(localStorage.getItem("userData"));
  const userId = ID.userID;
  const dispatch = useDispatch()
  const [save, setSave] = useState(false)
  const submit = () => {
    dispatch(changeQual(true))
  }

  const validate = (e) => {
    const errors = {};

    if (e.qualName && e.qualName.length < 5) {
      errors.qualName = "Слишком коротко";
    }

    if (e.qualInstitution && e.qualInstitution.length < 5) {
      errors.qualInstitution = "Слишком коротко";
    }

    if (e.progress && e.progress.length < 50) {
      errors.progress = "Напишите больше о своих достижений";
    }

    return errors;
  };

  const onSubmit = async (value) => {
    axios.put(`/api/auth/${userId}/edit/qual`, { ...value }).then(res => {
      if(res.status === 200) {
        setSave(true)
      }
    })
  };
  
  return (
    <div className={m.infoBar}>
      <div className={save === true ? m.saved : m.infoWrapp}>
        <h3 className={m.titleSmall}>Курсы и повышение квалификации</h3>
        <Form
          onSubmit={onSubmit}
          validate={validate}
          initialValues={{
            qualName: userData?.more?.qual?.qualName || "",
            qualInstitution: userData?.more?.qual?.qualInstitution || "",
            startQual: userData?.more?.qual?.startQual?.slice(0, 10) || "",
            endQual: userData?.more?.qual?.endQual?.slice(0, 10) || "",
          }}
          render={({ handleSubmit }) => (
            <form className="popup__form4" onSubmit={handleSubmit}>
              <div className="auth__main_reg-input__user_wrapper4">
              <div className="text-field-reg5 text-field_floating-reg5 auth__main_input-email_wrapper5">
                  <Field name="qualName">
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
                          Название
                        </label>
                        {meta.touched && meta.error && (
                          <span className="error-text4">{meta.error}</span>
                        )}
                      </>
                    )}
                  </Field>
                </div>
                <div className="text-field-reg5 text-field_floating-reg5 auth__main_input-email_wrapper5">
                  <Field name="qualInstitution">
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
                          Учебное заведение/Автор курса
                        </label>
                        {meta.touched && meta.error && (
                          <span className="error-text5">{meta.error}</span>
                        )}
                      </>
                    )}
                  </Field>
                </div>
                <div className={m.inputWrapper}>
                <div className="text-field-reg5 text-field_floating-reg5 auth__main_input-email_wrapper5">
                    <Field name="startQual">
                      {({ input, meta }) => (
                        <>
                          <input
                            type="date"
                            placeholder=" "
                            className={
                              meta.error ? errorInputDate : normalInputDate
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
                  <div className="text-field-reg5 text-field_floating-reg5 auth__main_input-email_wrapper5">
                    <Field name="endQual">
                      {({ input, meta }) => (
                        <>
                          <input
                            type="date"
                            placeholder=" "
                            className={
                              meta.error ? errorInputDate : normalInputDate
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

export default QualificationsForm;
