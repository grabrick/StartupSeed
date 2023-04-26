import React from "react";
import camera from "../../../assets/images/camera-2-line.svg";
import "./PersonalForm.css";
import m from "./PersonalForm.module.css";

function PersonalForm() {
    return (  
        <div className={m.infoBar}>
          <div className={m.infoWrapp}>
            <h3 className={m.titleSmall}>Личная информация</h3>
            <div className={m.avatar1}></div>
            <form className="popup__form1" name="register">
              <div className={m.avatar1}>
                <img src={camera} alt="" className={m.camera} />
              </div>
              <div className="auth__main_reg-input__user_wrapper1">
                <div className="text-field-reg1 text-field_floating-reg1 auth__main_input-email_wrapper1">
                  <input
                    type="text"
                    placeholder="Имя"
                    id="name"
                    name="email"
                    className="text-field__input-reg1 auth__main_input-name1"
                  />
                  <label className="text-field__label-reg1 text-lable1">
                    Имя
                  </label>
                </div>
                <div className="text-field-reg1 text-field_floating-reg1 auth__main_input-email_wrapper1">
                  <input
                    type="text"
                    placeholder="name"
                    id="name"
                    name="email"
                    className="text-field__input-reg1 auth__main_input-name1"
                  />
                  <label className="text-field__label-reg1 text-lable1">
                    Фамилия
                  </label>
                </div>
                <div className="text-field-reg1 text-field_floating-reg1 auth__main_input-email_wrapper1">
                  <span className="span">
                    Пол
                  </span>
                  <select className={m.selector} name="" id="">
                    <option value="Не указан">Не указан</option>
                    <option value="Мужской">Мужской</option>
                    <option value="Женский">Женский</option>
                  </select>
                </div>
                <div className="text-field-reg1 text-field_floating-reg1 auth__main_input-email_wrapper1">
                  <input
                    type="date"
                    placeholder="date"
                    id="name"
                    name="date"
                    className="text-field__input-reg1 auth__main_input-name1"
                  />
                  <label className="text-field__label-reg1 text-lable1">
                    Дата
                  </label>
                </div>
                <div className="text-field-reg1 text-field_floating-reg1 auth__main_input-email_wrapper1">
                  <input
                    type="text"
                    placeholder="name"
                    id="name"
                    name="email"
                    className="text-field__input-reg1 auth__main_input-name1"
                  />
                  <label className="text-field__label-reg1 text-lable1">
                    Страна
                  </label>
                </div>
                <div className="text-field-reg1 text-field_floating-reg1 auth__main_input-email_wrapper1">
                  <input
                    type="text"
                    placeholder="name"
                    id="name"
                    name="email"
                    className="text-field__input-reg1 auth__main_input-name1"
                  />
                  <label className="text-field__label-reg1 text-lable1">
                    Город
                  </label>
                </div>
                <button
                  type="submit"
                  className="popup__button_register-save1"
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

export default PersonalForm;