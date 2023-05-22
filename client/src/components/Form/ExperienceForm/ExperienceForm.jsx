import m from "./ExperienceForm.module.css";
import React, { useState } from "react";
import "./ExperienceForm.css";
import { changeExp } from "../../../redux/slices/formSlice";
import { useDispatch } from "react-redux";
import { Field, Form } from "react-final-form";
import axios from "axios";

function ExperienceForm() {
  const normalInput = "text-field__input-reg3 auth__main_input-name3";
  const errorInput =
    "text-field__input-reg__error3 auth__main_input-bio__error3";
  const normalLable = "text-field__label-reg3 text-lable2";
  const errorLable = "text-field__label-reg__error3 text-lable3";
  const normalInputArea =
    "text-field__input-reg3 auth__main_input-name32 text-input__textarea";
  const errorInputArea =
    "text-field__input-reg_error auth__main_input-name_error text-input__textarea";
  const dispatch = useDispatch();
  const [active, isActive] = useState(false)

  const submit = () => {
    dispatch(changeExp(true));
  };
  
  const validate = (e) => {
    const errors = {};

    if (e.jobPost && e.jobPost.length < 5) {
      errors.jobPost = "Слишком коротко";
    }

    if (e.company && e.company.length < 5) {
      errors.company = "Слишком коротко";
    }

    if (e.progress && e.progress.length < 50) {
      errors.progress = "Напишите больше о своих достижениях";
    }

    return errors;
  };
  
  const onSubmit = async (value) => {
    if(active === true) {
      const actualDate = 'По настоящее время'
      // value.endJob = 'По настоящее время'
      axios.put("/api/auth/edit/exp", { ...value, endJob: actualDate })
    } else {
      axios.put("/api/auth/edit/exp", { ...value })
    }
  };
  return (
    <div className={m.infoBar}>
      <div className={m.infoWrapp}>
        <h3 className={m.titleSmall}>Опыт работы</h3>
        <Form
          onSubmit={onSubmit}
          validate={validate}
          render={({ handleSubmit }) => (
            <form className="popup__form3" onSubmit={handleSubmit}>
              <div className="auth__main_reg-input__user_wrapper3">
                <div className={m.inputWrapper}>
                  <div className="text-field-reg3 text-field_floating-reg3 auth__main_input-email_wrapper3">
                    <Field name="jobPost">
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
                            Должность работы
                          </label>
                          {meta.touched && meta.error && (
                            <span className="error-text3">{meta.error}</span>
                          )}
                        </>
                      )}
                    </Field>
                  </div>
                  <div className="text-field-reg3 text-field_floating-reg3 auth__main_input-email_wrapper3">
                    <Field name="company">
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
                            Компания
                          </label>
                          {meta.touched && meta.error && (
                            <span className="error-text3">{meta.error}</span>
                          )}
                        </>
                      )}
                    </Field>
                  </div>
                  <div className="text-field-reg3 text-field_floating-reg3 auth__main_input-email_wrapper3">
                    <Field name="startJob">
                      {({ input, meta }) => (
                        <>
                          <input
                            type="date"
                            placeholder=" "
                            className={meta.error ? errorInput : normalInput}
                            {...input}
                          />
                          <label
                            className={meta.error ? errorLable : normalLable}
                          >
                            Начало работы
                          </label>
                        </>
                      )}
                    </Field>
                  </div>
                  <div className="text-field-reg3 text-field_floating-reg3 auth__main_input-email_wrapper3">
                    <Field name="endJob">
                      {({ input, meta }) => (
                        <>
                          <input
                            type="date"
                            placeholder=" "
                            disabled={active ? true : false}
                            className={meta.error ? errorInput : normalInput}
                            {...input}
                          />
                          <div className="checkbox">
                            <input type="checkbox" id="color-1" onChange={() => isActive(!active)} className="custom-checkbox" />
                            <label for="color-1">По настоящее время</label>
                          </div>
                          <label
                            className={meta.error ? errorLable : normalLable}
                          >
                            Окончание работы
                          </label>
                        </>
                      )}
                    </Field>
                  </div>
                </div>
                <div className="text-field-reg3 auth__main_input-email_wrapper3">
                  <Field name="progress">
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
                <div className={m.buttonWrapper}>
                  <button
                    type=""
                    className="popup__button_register-cancel3"
                    name="submit"
                    onClick={() => submit()}
                  >
                    Отмена
                  </button>
                  <button
                    type="submit"
                    className="popup__button_register-save3"
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

export default ExperienceForm;
