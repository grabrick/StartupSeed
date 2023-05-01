import React, { useEffect, useState } from "react";
// import camera from "../../../assets/images/camera-2-line.svg";
import "./PersonalForm.css";
import m from "./PersonalForm.module.css";
import { useHttp } from "../../../hooks/http.hook";

function PersonalForm() {  
  const { loading, request } = useHttp();
  const [form, setForm] = useState({
    profilePic: "",
    fname: "",
    lname: "",
    gender: "",
    country: "",
    hb: "",
    city: "",
  });
  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/edit/person", "PUT", {...form});
      console.log("Data", data);
      setForm({
        fname: "",
        lname: "",
        gender: "Не указан",
        country: "",
        hb: "",
        city: "",
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={m.infoBar}>
      <div className={m.infoWrapp}>
        <h3 className={m.titleSmall}>Личная информация</h3>
        <div className={m.avatar1}></div>
        <form
          className="popup__form1"
          name="register"
          method="post"
        >
          <div className={m.avatar1}>
            <input type="button" />
            <input className={m.camera} name="profilePic" onChange={changeHandler} type="file" />
            {/* <img src={photo} alt="" /> */}
          </div>
          <img src="" alt="" />
          <div className="auth__main_reg-input__user_wrapper1">
            <div className="text-field-reg1 text-field_floating-reg1 auth__main_input-email_wrapper1">
              <input
                type="text"
                placeholder="Имя"
                id="name"
                name="fname"
                className="text-field__input-reg1 auth__main_input-name1"
                value={form.fname}
                onChange={changeHandler}
              />
              <label className="text-field__label-reg1 text-lable1">Имя</label>
            </div>
            <div className="text-field-reg1 text-field_floating-reg1 auth__main_input-email_wrapper1">
              <input
                type="text"
                placeholder=" "
                id="name"
                name="lname"
                value={form.lname}
                className="text-field__input-reg1 auth__main_input-name1"
                onChange={changeHandler}
              />
              <label className="text-field__label-reg1 text-lable1">
                Фамилия
              </label>
            </div>
            <div className="text-field-reg1 text-field_floating-reg1 auth__main_input-email_wrapper1">
              <span className="span">Пол</span>
              <select
                className={m.selector}
                name="gender"
                value={form.gender}
                onChange={changeHandler}
              >
                <option value="Не указан">Не указан</option>
                <option value="Мужской">Мужской</option>
                <option value="Женский">Женский</option>
              </select>
            </div>
            <div className="text-field-reg1 text-field_floating-reg1 auth__main_input-email_wrapper1">
              <input
                type="date"
                placeholder=" "
                id="name"
                name="hb"
                value={form.hb}
                className="text-field__input-reg1 auth__main_input-name1"
                onChange={changeHandler}
              />
              <label className="text-field__label-reg1 text-lable1">
                Дата рождения
              </label>
            </div>
            <div className="text-field-reg1 text-field_floating-reg1 auth__main_input-email_wrapper1">
              <input
                type="text"
                placeholder=" "
                id="name"
                name="country"
                value={form.country}
                className="text-field__input-reg1 auth__main_input-name1"
                onChange={changeHandler}
              />
              <label className="text-field__label-reg1 text-lable1">
                Страна
              </label>
            </div>
            <div className="text-field-reg1 text-field_floating-reg1 auth__main_input-email_wrapper1">
              <input
                type="text"
                placeholder=" "
                id="name"
                name="city"
                className="text-field__input-reg1 auth__main_input-name1"
                value={form.city}
                onChange={changeHandler}
              />
              <label className="text-field__label-reg1 text-lable1">
                Город
              </label>
            </div>
            <button
              type="submit"
              className="popup__button_register-save1"
              name="submit"
              onClick={registerHandler}
              disabled={loading}
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
