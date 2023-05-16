import React, { useEffect } from "react";
import "./PersonalForm.css";
import m from "./PersonalForm.module.css";
import { useHttp } from "../../../hooks/http.hook";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getUser } from "../../../redux/slices/userSlice";
import { Field, Form } from "react-final-form";

function PersonalForm() {
  const normalInput = "text-field__input-reg1 auth__main_input-name1";
  const errorInput = "text-field__input-reg__error1 auth__main_input-bio__error1";
  const normalLable = "text-field__label-reg1 text-lable1";
  const errorLable = "text-field__label-reg__error1 text-lable1";
  const data = useSelector((state) => state.users.user);
  const dispatch = useDispatch();
  const User = (items) => {
    dispatch(getUser(items));
  };
  const { loading, request } = useHttp();
  let avatar = {
    profilePic: "",
  };

  useEffect(() => {
    axios
      .get("/api/auth/get")
      .then((items) => {
        User(items.data);
        console.log(items.data);
      })
      .catch((e) => {
        console.log(e);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const converter = (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      const uploadImage = async () => {
        try {
          const data = await request("/api/auth/upload", "PUT", {
            ...avatar,
            profilePic: reader.result,
          });
          console.log("Data", data);
        } catch (e) {
          console.log(e);
        }
      };
      uploadImage();
    };
    setTimeout(() => {
      axios
        .get("/api/auth/get")
        .then((items) => {
          User(items.data);
          console.log(items.data);
        })
        .catch((e) => {
          console.log(e);
        });
      reader.onerror = (error) => {
        console.log({ message: error });
      };
    }, 1000);
  };

  const validate = (e) => {
    const errors = {};

    if (e.fname && e.fname.length < 5) {
      errors.fname = "Слишком короткое имя";
    }
  
    if (e.lname && e.lname.length < 5) {
      errors.lname = "Слишком короткая фамилия";
    }

    if (e.country && e.country.length < 5) {
      errors.country = "Слишком короткая запись";
    }
  
    if (e.city && e.city.length < 5) {
      errors.city = "Слишком короткая запись";
    }

    return errors;
  };

  const onSubmit = async (value) => {
    try {
      const data = await request("/api/auth/edit/person", "PUT", { ...value });
      console.log("Data", data);
    } catch (e) {}
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
            >
              <div className={m.avatar1}>
                <img
                  className={m.profilePic}
                  src={data.more?.pers?.profilePic}
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
                  name="submit"
                  disabled={loading}
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
