import m from "./ProfessionalForm.module.css";
import React, { useState } from "react";
import "./ProfessionalForm.css";
import closeIcn from "../../../assets/images/close-line.svg";
import { useHttp } from "../../../hooks/http.hook";

function ProfessionalForm() {
  const { loading, request } = useHttp();
  const [tags, setTags] = useState([]);
  const [form, setForm] = useState({
    post: "",
    postLevel: "",
    lang: "",
    langLevel: "",
    skills: [],
  });
  // text-field__input-reg2 auth__main_input2
  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/edit/prof", "PUT", { ...form, skills: tags });
      console.log("Data", data);
      setForm({
        post: "",
        postLevel: "Не указан",
        lang: "",
        langLevel: "Не указан",
        skills: ""
      });
      setTags([])
    } catch (e) {
      console.log(e);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    registerHandler();
  };

  const handleKeyDown = (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    const value = e.target.value;
    if (!value) return;
    setTags([...tags, value]);
    e.target.value = ''
  };

  const removeTags = (index) => {
    setTags(tags.filter((el, i) => i !== index));
  };

  return (
    <div className={m.infoBar}>
      <div className={m.infoWrapp}>
        <h3 className={m.titleSmall}>Профессиональная информация</h3>
        <form className="popup__form2" onSubmit={handleClick} name="register">
          <div className="auth__main_reg-input__user_wrapper2">
            <div className={m.inputWrapper}>
              <div className="text-field-reg2 text-field_floating-reg2 auth__main_input-email_wrapper2">
                <input
                  type="text"
                  placeholder="Желаемая должность"
                  id="name"
                  name="post"
                  className="text-field__input-reg2 auth__main_input-name2"
                  value={form.post}
                  onChange={changeHandler}
                />
                <label className="text-field__label-reg2 text-lable2">
                  Желаемая должность
                </label>
              </div>
              <div className="text-field-reg2 text-field_floating-reg2 auth__main_input-email_wrapper2">
                <span className="span">Уровень</span>
                <select
                  className={m.selector}
                  name="postLevel"
                  value={form.postLevel}
                  onChange={changeHandler}
                >
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
                  name="lang"
                  className="text-field__input-reg2 auth__main_input-name2"
                  value={form.lang}
                  onChange={changeHandler}
                />
                <label className="text-field__label-reg2 text-lable2">
                  Иностранный язык
                </label>
              </div>
              <div className="text-field-reg2 text-field_floating-reg2 auth__main_input-email_wrapper2">
                <span className="span">Уровень</span>
                <select
                  className={m.selector}
                  name="langLevel"
                  value={form.langLevel}
                  onChange={changeHandler}
                >
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
                // required
                type="text"
                placeholder="Навыки"
                name="skills"
                className="text-field__input-reg2 auth__main_input2"
                value={form.skills}
                onKeyDown={handleKeyDown}
                onChange={changeHandler}
              />
              <label className="text-field__label-reg2 text-lable2">
                Навыки
              </label>
            </div>
            <div className={m.tagsWrapper}>
                {tags.map((tag, i) => (
                  <div key={i} className={m.tags}>
                    <span className={m.tag}>{tag}</span>
                    <img
                      className={m.tagBtn}
                      onClick={() => removeTags(i)}
                      src={closeIcn}
                      alt=""
                    />
                  </div>
                ))}
              </div>
            <button
              className="popup__button_register-save2"
              name="submit"
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

export default ProfessionalForm;
