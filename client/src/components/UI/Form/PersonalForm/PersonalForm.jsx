import React from "react";
import "./PersonalForm.css";
import m from "./PersonalForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getUser } from "../../../../redux/slices/userSlice";
import { Field, Form } from "react-final-form";

function PersonalForm() {
  const normalInput = "text-field__input-reg1 auth__main_input-name1";
  const errorInput = "text-field__input-reg__error1 auth__main_input-bio__error1";
  const normalLable = "text-field__label-reg1 text-lable1";
  const errorLable = "text-field__label-reg__error1 text-lable1";
  const data = useSelector((state) => state.users.user);
  const dispatch = useDispatch();
  const ID = JSON.parse(localStorage.getItem("userData"));
  const userId = ID.userID;
  const User = (items) => {
    dispatch(getUser(items));
  };

  const update = () => {
    axios.get(`/api/auth/${userId}/get`)
      .then((items) => {
        User(items.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const converter = (e) => {
    let file = e.target.files[0];
    let formData = new FormData();
    formData.append('upload', file);
    
    axios.put(`/api/auth/${userId}/upload`, formData)
    .then(response => {
      if(response.status === 200) {
        update()
      }
    });
  };

  const validate = (e) => {
    const errors = {};

    if (e.fname && e.fname.length < 3) {
      errors.fname = "Слишком короткое имя";
    }

    if (e.lname && e.lname.length < 3) {
      errors.lname = "Слишком короткая фамилия";
    }

    if (e.country && e.country.length < 3) {
      errors.country = "Слишком короткая запись";
    }

    if (e.city && e.city.length < 3) {
      errors.city = "Слишком короткая запись";
    }

    return errors;
  };

  const onSubmit = async (value) => {
    axios.put(`/api/auth/${userId}/edit/person`, { ...value });
  };
  return (
    <div className={m.infoBar}>
      <div className={m.infoWrapp}>
        <h3 className={m.titleSmall}>Личная информация</h3>
        <Form
          onSubmit={onSubmit}
          validate={validate}
          render={({ handleSubmit }) => (
            <form
              className="popup__form1"
              name="register"
              onSubmit={handleSubmit}
              method="post"
              action={`/${userId}/upload`}
              encType="multipart/form-data"
            >
              <div className={m.avatar1}>
                <img
                  className={m.profilePic}
                  src={`http://startupseed.ru/${data.more?.pers?.profilePic}`}
                  alt=""
                />
                <input type="button" className={m.cameraBtn} />
                <input
                  className={m.camera}
                  name="profilePic"
                  onChange={converter}
                  type="file"
                />
              </div>
              <div className="auth__main_reg-input__user_wrapper1">
                <div className="text-field-reg1 text-field_floating-reg1 auth__main_input-email_wrapper1">
                  <Field name="fname">
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
                          Имя
                        </label>
                        {meta.touched && meta.error && (
                          <span className="error-text1">{meta.error}</span>
                        )}
                      </>
                    )}
                  </Field>
                </div>
                <div className="text-field-reg1 text-field_floating-reg1 auth__main_input-email_wrapper1">
                  <Field name="lname">
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
                          Фамилия
                        </label>
                        {meta.touched && meta.error && (
                          <span className="error-text1">{meta.error}</span>
                        )}
                      </>
                    )}
                  </Field>
                </div>
                <div className="text-field-reg1 text-field_floating-reg1 auth__main_input-email_wrapper1">
                  <Field name="gender">
                    {({ input, meta }) => (
                      <>
                        <span className="span">Пол</span>
                        <select className={m.selector} {...input} name="gender">
                          <option value="Не указан">Не указан</option>
                          <option value="Мужской">Мужской</option>
                          <option value="Женский">Женский</option>
                        </select>
                      </>
                    )}
                  </Field>
                </div>
                <div className="text-field-reg1 text-field_floating-reg1 auth__main_input-email_wrapper1">
                  <Field name="hb">
                    {({ input, meta }) => (
                      <>
                        <input
                          type="date"
                          placeholder=" "
                          className={meta.error ? errorInput : normalInput}
                          {...input}
                        />
                        <label
                          className={meta.error ? errorLable : normalLable}
                        >
                          День рождения
                        </label>
                      </>
                    )}
                  </Field>
                </div>
                <div className="text-field-reg1 text-field_floating-reg1 auth__main_input-email_wrapper1">
                  <Field name="country">
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
                          Страна
                        </label>
                        {meta.touched && meta.error && (
                          <p className="error-text1">{meta.error}</p>
                        )}
                      </>
                    )}
                  </Field>
                </div>
                <div className="text-field-reg1 text-field_floating-reg1 auth__main_input-email_wrapper1">
                  <Field name="city">
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
                          Город
                        </label>
                        {meta.touched && meta.error && (
                          <span className="error-text1">{meta.error}</span>
                        )}
                      </>
                    )}
                  </Field>
                </div>
                <button
                  type="submit"
                  className="popup__button_register-save1"
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

export default PersonalForm;
