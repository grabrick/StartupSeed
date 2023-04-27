import m from "./EducationForm.module.css";
import React from "react";
import "./EducationForm.css";
import { changeProf } from "../../../redux/slices/formSlice";
import { useDispatch } from "react-redux";

function EducationForm() {
  const dispatch = useDispatch()

  const submit = () => {
    dispatch(changeProf(true))
  }

  return (
    <div className={m.infoBar}>
      <div className={m.infoWrapp}>
        <h3 className={m.titleSmall}>Образование</h3>
        <form className="popup__form4">
          <div className="auth__main_reg-input__user_wrapper4">
            <div className="text-field-reg4 text-field_floating-reg4 auth__main_input-email_wrapper4">
              <input
                type="text"
                placeholder=" "
                id="name"
                name="email"
                className="text-field__input-reg4 auth__main_input-name4"
              />
              <label className="text-field__label-reg4 text-lable4">
                Специальность
              </label>
            </div>
            <div className="text-field-reg4 text-field_floating-reg4 auth__main_input-email_wrapper4">
              <input
                type="text"
                placeholder=" "
                id="name"
                name="email"
                className="text-field__input-reg4 auth__main_input-name4"
              />
              <label className="text-field__label-reg4 text-lable4">
                Учебное заведение
              </label>
            </div>
            <div className={m.inputWrapper}>
              <div className="text-field-reg4 text-field_floating-reg4 auth__main_input-email_wrapper4">
                <input
                  type="date"
                  placeholder=" "
                  id="name"
                  name="email"
                  className="text-field__input-reg4 auth__main_input-date4"
                />
                <label className="text-field__label-reg4 text-lable4">
                  Начало обучения
                </label>
              </div>
              <div className="text-field-reg4 text-field_floating-reg4 auth__main_input-email_wrapper4">
                <input
                  type="date"
                  placeholder=" "
                  id="name"
                  name="email"
                  className="text-field__input-reg4 auth__main_input-date4"
                />
                <label className="text-field__label-reg4 text-lable4">
                  Окончание обучения
                </label>
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
      </div>
    </div>
  );
}

export default EducationForm;
