import m from "./ExperienceForm.module.css";
import React from "react";
import "./ExperienceForm.css";

function ExperienceForm() {

  return (
    <div className={m.infoBar}>
      <div className={m.infoWrapp}>
        <h3 className={m.titleSmall}>Профессиональная информация</h3>
        <form className="popup__form3" name="register">
          <div className="auth__main_reg-input__user_wrapper3">
            <div className={m.inputWrapper}>
              <div className="text-field-reg3 text-field_floating-reg3 auth__main_input-email_wrapper3">
                <input
                  type="text"
                  placeholder=" "
                  id="name"
                  name="email"
                  className="text-field__input-reg3 auth__main_input-name3"
                />
                <label className="text-field__label-reg3 text-lable3">
                  Должность работы
                </label>
              </div>
              <div className="text-field-reg3 text-field_floating-reg3 auth__main_input-email_wrapper3">
                <input
                  type="text"
                  placeholder=" "
                  id="name"
                  name="email"
                  className="text-field__input-reg3 auth__main_input-name3"
                />
                <label className="text-field__label-reg3 text-lable3">
                  Компания
                </label>
              </div>
              <div className="text-field-reg3 text-field_floating-reg3 auth__main_input-email_wrapper3">
                <input
                  type="date"
                  placeholder="Желаемая должность"
                  id="name"
                  name="email"
                  className="text-field__input-reg3 auth__main_input-name3"
                />
                <label className="text-field__label-reg3 text-lable3">
                  Начало работы
                </label>
              </div>
              <div className="text-field-reg3 text-field_floating-reg3 auth__main_input-email_wrapper3">
                <input
                  type="date"
                  placeholder="Желаемая должность"
                  id="name"
                  name="email"
                  className="text-field__input-reg3 auth__main_input-name3"
                />
                <label className="text-field__label-reg3 text-lable3">
                  Окончание работы
                </label>
              </div>
            </div>
            <div className="text-field-reg3 text-field_floating-reg3 auth__main_input-email_wrapper3">
                <textarea
                  type="text"
                  placeholder="Опешите ваши задачи и достижения"
                  id="name"
                  name="email"
                  className="text-field__input-reg3 auth__main_input-name32 text-input__textarea"
                />
              </div>
            <button
              type="submit"
              className="popup__button_register-save3"
              name="submit"
            >
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ExperienceForm;