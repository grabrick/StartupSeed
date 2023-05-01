import m from "./ExperienceForm.module.css";
import React, { useState } from "react";
import "./ExperienceForm.css";
import { changeExp } from "../../../redux/slices/formSlice";
import { useDispatch } from "react-redux";
import { useHttp } from "../../../hooks/http.hook";

function ExperienceForm() {
  const dispatch = useDispatch()

  const submit = () => {
    dispatch(changeExp(true))
  }

  const { loading, request } = useHttp();
  const [form, setForm] = useState({
    jobPost: "",
    company: "",
    startJob: "",
    endJob: "",
    progress: "",
  });

  const changeHandler = (event) => {
    setForm({...form, [event.target.name]: event.target.value})
}

  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/edit/exp", "PUT", { ...form });
      console.log("Data", data);
      setForm({
        jobPost: "",
        company: "",
        startJob: "",
        endJob: "",
        progress: "",
      })
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className={m.infoBar}>
      <div className={m.infoWrapp}>
        <h3 className={m.titleSmall}>Опыт работы</h3>
        <form className="popup__form3" name="register">
          <div className="auth__main_reg-input__user_wrapper3">
            <div className={m.inputWrapper}>
              <div className="text-field-reg3 text-field_floating-reg3 auth__main_input-email_wrapper3">
                <input
                  type="text"
                  placeholder=" "
                  id="name"
                  name="jobPost"
                  className="text-field__input-reg3 auth__main_input-name3"
                  value={form.jobPost}
                  onChange={changeHandler}
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
                  name="company"
                  className="text-field__input-reg3 auth__main_input-name3"
                  value={form.company}
                  onChange={changeHandler}
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
                  name="startJob"
                  className="text-field__input-reg3 auth__main_input-name3"
                  value={form.startJob}
                  onChange={changeHandler}
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
                  name="endJob"
                  className="text-field__input-reg3 auth__main_input-name3"
                  value={form.endJob}
                  onChange={changeHandler}
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
                name="progress"
                className="text-field__input-reg3 auth__main_input-name32 text-input__textarea"
                value={form.progress}
                onChange={changeHandler}
              />
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
                onClick={registerHandler}
                disabled={loading}
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

export default ExperienceForm;
