import m from "./ProfessionalForm.module.css";
import React from "react";
import "./ProfessionalForm.css";

function ProfessionalForm() {

  return (
    <div className={m.infoBar}>
      <div className={m.infoWrapp}>
        <h3 className={m.titleSmall}>Профессиональная информация</h3>
        <form className="popup__form2" name="register">
          <div className="auth__main_reg-input__user_wrapper2">
            <div className={m.inputWrapper}>
              <div className="text-field-reg2 text-field_floating-reg2 auth__main_input-email_wrapper2">
                <input
                  type="text"
                  placeholder="Желаемая должность"
                  id="name"
                  name="email"
                  className="text-field__input-reg2 auth__main_input-name2"
                />
                <label className="text-field__label-reg2 text-lable2">
                  Желаемая должность
                </label>
              </div>
              <div className="text-field-reg2 text-field_floating-reg2 auth__main_input-email_wrapper2">
                <span className="span">Уровень</span>
                <select className={m.selector} name="" id="">
                  <option value="Не указан">Не указан</option>
                  <option value="Junior">Junior</option>
                  <option value="Middle">Middle</option>
                  <option value="Senior">Senior</option>
                  <option value="Lead">Lead</option>
                </select>
              </div>
            </div>
            <div className={m.inputWrapper}>
              <div className="text-field-reg2 text-field_floating-reg2 auth__main_input-email_wrapper2">
                <input
                  type="text"
                  placeholder="Иностранный язык"
                  id="name"
                  name="email"
                  className="text-field__input-reg2 auth__main_input-name2"
                />
                <label className="text-field__label-reg2 text-lable2">
                  Иностранный язык
                </label>
              </div>
              <div className="text-field-reg2 text-field_floating-reg2 auth__main_input-email_wrapper2">
                <span className="span">Уровень</span>
                <select className={m.selector} name="" id="">
                  <option value="Не указан">Не указан</option>
                  <option value="A1">A1</option>
                  <option value="A2">A2</option>
                  <option value="B1">B1</option>
                  <option value="B2">B2</option>
                  <option value="C1">C1</option>
                  <option value="C2">C2</option>
                </select>
              </div>
            </div>
            <div className="text-field-reg2 text-field_floating-reg2 auth__main_input-email_wrapper2">
              <input
                type="text"
                placeholder="Навыки"
                id="name"
                name="email"
                className="text-field__input-reg2 auth__main_input2"
              />
              <label className="text-field__label-reg2 text-lable2">
                Навыки
              </label>
            </div>
            <button
              type="submit"
              className="popup__button_register-save2"
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

export default ProfessionalForm;
