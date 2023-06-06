import m from "./ProfessionalForm.module.css";
import React, { useState } from "react";
import "./ProfessionalForm.css";
import closeIcn from "../../../assets/images/close-line.svg";
import addIcn from "../../../assets/images/add-line.svg"
import { Field, Form } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { addTag, removeTag } from "../../../redux/slices/skillsSlice";
import axios from "axios";

function ProfessionalForm() {
  const normalInput = "text-field__input-reg2 auth__main_input-name2";
  const errorInput = "text-field__input-reg__error2 auth__main_input-bio__error2";
  const normalLable = "text-field__label-reg2 text-lable2";
  const errorLable = "text-field__label-reg__error2 text-lable2";
  const data = useSelector((state) => state.skills.skills);
  const dispatch = useDispatch();
  const ID = JSON.parse(localStorage.getItem("userData"));
  const userId = ID.userID;
  const addTags = (items) => {
    dispatch(addTag(items));
  };
  const removeTags = (i) => {
    dispatch(removeTag(i));
  };
  const [skills, setSkills] = useState([]);
  const [form, setForm] = useState({
    skills: [],
  });

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleKeyDown = (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault()
    let value = e.target.value;
    if (!value.trim()) return;
    setSkills([...skills, value])
    addTags([...skills, value])
    setSkills([])
    setForm({ skills: "" })
  };

  const clickAddTag = () => {
    if (!form.skills.trim()) return;
    setSkills([...skills, form.skills])
    addTags([...skills, form.skills])
    setSkills([])
    setForm({ skills: "" })
  }

  const validate = (e) => {
    const errors = {};

    if (e.post && e.post.length < 5) {
      errors.post = "Слишком коротко";
    }

    if (e.lang && e.lang.length < 5) {
      errors.lang = "Слишком коротко";
    }

    return errors;
  };

  const onSubmit = async (value) => {
    axios.put(`/api/auth/${userId}/edit/prof`, { ...value, skills: data })
  };

  return (
    <div className={m.infoBar}>
      <div className={m.infoWrapp}>
        <h3 className={m.titleSmall}>Профессиональная информация</h3>
        <Form
          onSubmit={onSubmit}
          validate={validate}
          render={({ handleSubmit }) => (
            <form className="popup__form2" onSubmit={handleSubmit}>
              <div className="auth__main_reg-input__user_wrapper2">
                <div className="text-field-reg2 text-field_floating-reg2 auth__main_input-email_wrapper2">
                  <Field name="post">
                    {({ input, meta }) => (
                      <>
                        <input
                          type="text"
                          placeholder=" "
                          className={meta.error ? errorInput : normalInput}
                          {...input}
                        />
                        <label
                          className={meta.error ? errorLable : normalLable}
                        >
                          Желаемая должность
                        </label>
                        {meta.touched && meta.error && (
                          <span className="error-text2">{meta.error}</span>
                        )}
                      </>
                    )}
                  </Field>
                </div>
                <div className="text-field-reg2 text-field_floating-reg2 auth__main_input-email_wrapper2">
                  <Field name="postLevel">
                    {({ input, meta }) => (
                      <>
                        <span className="span">Уровень</span>
                        <select
                          className={m.selector}
                          {...input}
                          name="postLevel"
                        >
                          <option value="Не указан">Не указан</option>
                          <option value="Junior">Junior</option>
                          <option value="Middle">Middle</option>
                          <option value="Senior">Senior</option>
                          <option value="Lead">Lead</option>
                        </select>
                      </>
                    )}
                  </Field>
                </div>
                <div className="text-field-reg2 text-field_floating-reg2 auth__main_input-email_wrapper2">
                  <Field name="lang">
                    {({ input, meta }) => (
                      <>
                        <input
                          type="text"
                          placeholder=" "
                          className={meta.error ? errorInput : normalInput}
                          {...input}
                        />
                        <label
                          className={meta.error ? errorLable : normalLable}
                        >
                          Иностранный язык
                        </label>
                        {meta.touched && meta.error && (
                          <span className="error-text2">{meta.error}</span>
                        )}
                      </>
                    )}
                  </Field>
                </div>
                <div className="text-field-reg2 text-field_floating-reg2 auth__main_input-email_wrapper2">
                  <Field name="langLevel">
                    {({ input, meta }) => (
                      <>
                        <span className="span">Уровень</span>
                        <select
                          className={m.selector}
                          name="langLevel"
                          {...input}
                        >
                          <option value="Не указан">Не указан</option>
                          <option value="A1">A1</option>
                          <option value="A2">A2</option>
                          <option value="B1">B1</option>
                          <option value="B2">B2</option>
                          <option value="C1">C1</option>
                          <option value="C2">C2</option>
                        </select>
                      </>
                    )}
                  </Field>
                </div>
                <div className="text-field-reg2 text-field_floating-reg2 auth__main_input-email_wrapper2">
                  <input
                    type="text"
                    name="skills"
                    placeholder=" "
                    className="text-field__input-reg2 auth__main_input2"
                    value={form.skills}
                    onKeyDown={handleKeyDown}
                    onChange={changeHandler}
                  />
                  <label className="text-field__label-reg2 text-lable2">
                    Навыки
                  </label>
                    <img src={addIcn} className={m.buttonAdd} onClick={() => clickAddTag()} alt="" />
                </div>
                <div className={m.tagsWrapper}>
                    {data.map((tag, i) => (
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
                  type="submit"
                  className="popup__button_register-save2"
                >
                  Сохранить
                </button>
              </div>
            </form>
          )}
        />
      </div>
    </div>
  );
}

export default ProfessionalForm;
