import m from "./QualificationsForm.module.css";
import React from "react";
import "./QualificationsForm.css";

function QualificationsForm() {
  return (
    <div className={m.infoBar}>
      <div className={m.infoWrapp}>
        <h3 className={m.titleSmall}>Образование</h3>
        <form className="popup__form5">
          <div className="auth__main_reg-input__user_wrapper5">
            <div className="text-field-reg5 text-field_floating-reg5 auth__main_input-email_wrapper5">
              <input
                type="text"
                placeholder=" "
                id="name"
                name="email"
                className="text-field__input-reg5 auth__main_input-name5"
              />
              <label className="text-field__label-reg5 text-lable5">
                Специальность
              </label>
            </div>
            <div className="text-field-reg5 text-field_floating-reg5 auth__main_input-email_wrapper5">
              <input
                type="text"
                placeholder=" "
                id="name"
                name="email"
                className="text-field__input-reg5 auth__main_input-name5"
              />
              <label className="text-field__label-reg5 text-lable5">
                Учебное заведение
              </label>
            </div>
            <div className={m.inputWrapper}>
              <div className="text-field-reg5 text-field_floating-reg5 auth__main_input-email_wrapper5">
                <input
                  type="date"
                  placeholder=" "
                  id="name"
                  name="email"
                  className="text-field__input-reg5 auth__main_input-date5"
                />
                <label className="text-field__label-reg5 text-lable5">
                  Начало обучения
                </label>
              </div>
              <div className="text-field-reg5 text-field_floating-reg5 auth__main_input-email_wrapper5">
                <input
                  type="date"
                  placeholder=" "
                  id="name"
                  name="email"
                  className="text-field__input-reg5 auth__main_input-date5"
                />
                <label className="text-field__label-reg5 text-lable5">
                  Окончание обучения
                </label>
              </div>
            </div>
            <div className={m.buttonWrapper}>
              <button
                type="submit"
                className="popup__button_register-cancel5"
                name="submit"
              >
                Отмена
              </button>
              <button
                type="submit"
                className="popup__button_register-save5"
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

export default QualificationsForm;
