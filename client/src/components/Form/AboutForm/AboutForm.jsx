import m from "./AboutForm.module.css";
import React from "react";
import "./AboutForm.css";

function AboutForm() {
  return (
    <div className={m.infoBar}>
      <div className={m.infoWrapp}>
        <h3 className={m.titleSmall}>О себе</h3>
        <form className="popup__form6">
          <div className="auth__main_reg-input__user_wrapper6">
          <div className="text-field-reg6 text-field_floating-reg6 auth__main_input-email_wrapper6">
              <textarea
                type="text"
                placeholder="Опешите ваши задачи и достижения"
                id="name"
                name="email"
                className="text-field__input-reg6 auth__main_input-name6 text-input__textarea"
              />
            </div>
              <button
                type="submit"
                className="popup__button_register-save6"
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

export default AboutForm;