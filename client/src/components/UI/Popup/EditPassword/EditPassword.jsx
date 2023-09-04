import { useState } from "react";
import "./EditPassword.css";
import m from "./EditPassword.module.css";
import { useDispatch, useSelector } from "react-redux";
import { activePassword } from "../../../../redux/slices/popupSlice";
import { Field, Form } from "react-final-form";
import eyeOpen from "../../../../assets/images/eye-line.svg";
import eyeClose from "../../../../assets/images/eye-off-line.svg";
import axios from "axios";
import { getUser } from "../../../../redux/slices/userSlice";

const EditPassword = () => {
  const isVisibleEmail = useSelector((state) => state.popup.visiblePassword);
  const hashPassword = useSelector((state) => state.users.user.password);
  const errorInput = `${m.inputError}`;
  const normalInput = `${m.input}`;
  const inactive = "popup__change";
  const active = "popup__change_opened";
  const [currentPas, setCurrentPas] = useState(false);
  const [newPas, setNewPas] = useState(false);
  const [repeatPas, setRepeatPas] = useState(false);
  const ID = JSON.parse(localStorage.getItem("userData"));
  const userId = ID.userID
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.removeItem("userData")
    setTimeout(() => {
      window.location.reload()
      window.location.replace('/')
    }, 2000);
  }

  const updataData = () => {
    axios
      .get(`/api/auth/${userId}/get`)
      .then((items) => {
        User(items.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const User = (items) => {
    dispatch(getUser(items));
  };

  const showPassword = () => {
    setCurrentPas(true);
    if (currentPas === true) {
      setCurrentPas(false);
    }
  };

  const showNewPassword = () => {
    setNewPas(true);
    if (newPas === true) {
      setNewPas(false);
    }
  };

  const showRepeatPassword = () => {
    setRepeatPas(true);
    if (repeatPas === true) {
      setRepeatPas(false);
    }
  };

  const closePopup = () => {
    dispatch(activePassword(true));
  };

  const validate = (e) => {
    const errors = {};

    if (e.oldPassword && e.oldPassword.length < 5) {
      errors.oldPassword = "Слишком короткий пароль";
    }
    if (e.newPassword && e.newPassword.length < 5) {
      errors.newPassword = "Слишком короткий пароль";
    }
    if (e.repeatNewPassword && e.repeatNewPassword.length < 5) {
      errors.repeatNewPassword = "Слишком короткий пароль";
    }

    return errors;
  };

  const onSubmit = async (value) => {
    axios
      .put(`/api/auth/${userId}/edit/password`, { ...value, hashPassword: hashPassword })
      .then((response) => {
        if (response.status === 200) {
          updataData();
          closePopup()
          logout()
        }
      });
  };

  return (
    <>
      <div
        className={isVisibleEmail ? active : inactive}
        onClick={() => closePopup()}
      >
        <div className={m.popup} onClick={(e) => e.stopPropagation()}>
          <div className={m.popupWrapper}>
            <div className={m.textWrapper}>
              <div className={m.titleWrapper}>
                <h2 className={m.title}>Смена пароля</h2>
              </div>
              <p className={m.text}>
                После изменения пароля произойдет выход из аккаунта
              </p>
            </div>
            <Form
              onSubmit={onSubmit}
              validate={validate}
              render={({ handleSubmit }) => (
                <form className={m.form} onSubmit={handleSubmit}>
                  <div className={m.formWrapper}>
                    <Field name="oldPassword">
                      {({ input, meta }) => (
                        <>
                          <input
                            type={currentPas ? "text" : "password"}
                            placeholder="Текущий пароль"
                            className={meta.error ? errorInput : normalInput}
                            {...input}
                          />
                          <img
                            src={currentPas ? eyeOpen : eyeClose}
                            onClick={() => showPassword()}
                            className={m.eye}
                            alt=""
                          />
                          {meta.touched && meta.error && (
                            <span className={m.errorSpan}>{meta.error}</span>
                          )}
                        </>
                      )}
                    </Field>
                    <Field name="newPassword">
                      {({ input, meta }) => (
                        <>
                          <input
                            type={newPas ? "text" : "password"}
                            placeholder="Новый пароль"
                            className={meta.error ? errorInput : normalInput}
                            {...input}
                          />
                          <img
                            src={newPas ? eyeOpen : eyeClose}
                            onClick={() => showNewPassword()}
                            className={m.eye}
                            alt=""
                          />
                          {meta.touched && meta.error && (
                            <span className={m.errorSpan}>{meta.error}</span>
                          )}
                        </>
                      )}
                    </Field>

                    <Field name="repeatNewPassword">
                      {({ input, meta }) => (
                        <>
                          <input
                            type={repeatPas ? "text" : "password"}
                            placeholder="Повторите пароль"
                            className={meta.error ? errorInput : normalInput}
                            {...input}
                          />
                          <img
                            src={repeatPas ? eyeOpen : eyeClose}
                            onClick={() => showRepeatPassword()}
                            className={m.eye}
                            alt=""
                          />
                          {meta.touched && meta.error && (
                            <span className={m.errorSpan}>{meta.error}</span>
                          )}
                        </>
                      )}
                    </Field>
                  </div>
                  <div className={m.btnWrapper}>
                    <button type="submit" className={m.btnSave}>
                      Изменить
                    </button>
                    <button
                      className={m.btnCancel}
                      onClick={() => closePopup()}
                    >
                      Отмена
                    </button>
                  </div>
                </form>
              )}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditPassword;
