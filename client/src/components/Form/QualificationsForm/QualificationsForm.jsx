import m from "./QualificationsForm.module.css";
import React, { useState } from "react";
import "./QualificationsForm.css";
import { changeQual } from "../../../redux/slices/formSlice";
import { useDispatch } from "react-redux";
import { useHttp } from "../../../hooks/http.hook";

function QualificationsForm() {
  const dispatch = useDispatch()

  const submit = () => {
    dispatch(changeQual(true))
  }
  const { loading, request } = useHttp();
  const [form, setForm] = useState({
    qualName: "",
    qualInstitution: "",
    startQual: "",
    endQual: "",
  });

  const changeHandler = (event) => {
    setForm({...form, [event.target.name]: event.target.value})
}

  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/edit/qual", "PUT", { ...form });
      console.log("Data", data);
      setForm({
        qualName: "",
        qualInstitution: "",
        startQual: "",
        endQual: "",
      })
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className={m.infoBar}>
      <div className={m.infoWrapp}>
        <h3 className={m.titleSmall}>Курсы и повышение квалификации</h3>
        <form className="popup__form5">
          <div className="auth__main_reg-input__user_wrapper5">
            <div className="text-field-reg5 text-field_floating-reg5 auth__main_input-email_wrapper5">
              <input
                type="text"
                placeholder=" "
                id="name"
                name="qualName"
                className="text-field__input-reg5 auth__main_input-name5"
                value={form.qualName}
                onChange={changeHandler}
              />
              <label className="text-field__label-reg5 text-lable5">
                Название
              </label>
            </div>
            <div className="text-field-reg5 text-field_floating-reg5 auth__main_input-email_wrapper5">
              <input
                type="text"
                placeholder=" "
                id="name"
                name="qualInstitution"
                className="text-field__input-reg5 auth__main_input-name5"
                value={form.qualInstitution}
                onChange={changeHandler}
              />
              <label className="text-field__label-reg5 text-lable5">
                Учебное заведение/Автор курса
              </label>
            </div>
            <div className={m.inputWrapper}>
              <div className="text-field-reg5 text-field_floating-reg5 auth__main_input-email_wrapper5">
                <input
                  type="date"
                  placeholder=" "
                  id="name"
                  name="startQual"
                  className="text-field__input-reg5 auth__main_input-date5"
                  value={form.startQual}
                  onChange={changeHandler}
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
                  name="endQual"
                  className="text-field__input-reg5 auth__main_input-date5"
                  value={form.endQual}
                  onChange={changeHandler}
                />
                <label className="text-field__label-reg5 text-lable5">
                  Окончание обучения
                </label>
              </div>
            </div>
            <div className={m.buttonWrapper}>
              <button
                type=""
                className="popup__button_register-cancel5"
                name="submit"
                onClick={() => submit()}
              >
                Отмена
              </button>
              <button
                type="submit"
                className="popup__button_register-save5"
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

export default QualificationsForm;
