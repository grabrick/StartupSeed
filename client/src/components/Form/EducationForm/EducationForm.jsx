import m from "./EducationForm.module.css";
import React, { useState } from "react";
import "./EducationForm.css";
import { changeProf } from "../../../redux/slices/formSlice";
import { useDispatch } from "react-redux";
import { useHttp } from "../../../hooks/http.hook";

function EducationForm() {
  const dispatch = useDispatch()

  const submit = () => {
    dispatch(changeProf(true))
  }

  const { loading, request } = useHttp();
  const [form, setForm] = useState({
    specialization: "",
    institution: "",
    startEdu: "",
    endEdu: "",
  });

  const changeHandler = (event) => {
    setForm({...form, [event.target.name]: event.target.value})
}

  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/edit/edu", "PUT", { ...form });
      console.log("Data", data);
      setForm({
        specialization: "",
        institution: "",
        startEdu: "",
        endEdu: "",
      })
    } catch (e) {
      console.log(e);
    }
  };
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
                name="specialization"
                className="text-field__input-reg4 auth__main_input-name4"
                value={form.specialization}
                onChange={changeHandler}
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
                name="institution"
                className="text-field__input-reg4 auth__main_input-name4"
                value={form.institution}
                onChange={changeHandler}
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
                  name="startEdu"
                  className="text-field__input-reg4 auth__main_input-date4"
                  value={form.startEdu}
                  onChange={changeHandler}
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
                  name="endEdu"
                  className="text-field__input-reg4 auth__main_input-date4"
                  value={form.endEdu}
                  onChange={changeHandler}
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

export default EducationForm;
