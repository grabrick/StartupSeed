import m from "./AboutForm.module.css";
import React, { useState } from "react";
import "./AboutForm.css";
import { useHttp } from "../../../hooks/http.hook";

function AboutForm() {
  const { loading, request } = useHttp();
  const [form, setForm] = useState({
    aboutMe: ""
  });

  const changeHandler = (event) => {
    setForm({...form, [event.target.name]: event.target.value})
}

  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/edit/about", "PUT", { ...form });
      console.log("Data", data);
      setForm({
        aboutMe: ""
      })
    } catch (e) {
      console.log(e);
    }
  };
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
                name="aboutMe"
                className="text-field__input-reg6 auth__main_input-name6 text-input__textarea"
                value={form.aboutMe}
                onChange={changeHandler}
              />
            </div>
              <button
                type="submit"
                className="popup__button_register-save6"
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

export default AboutForm;