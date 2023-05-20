import "./EditEmail.css";
import m from "./EditEmail.module.css";
import { useDispatch, useSelector } from "react-redux";
import { activeEmail } from "../../../redux/slices/popupSlice";
import { useState } from "react";
import { Field, Form } from "react-final-form";
import { useHttp } from "../../../hooks/http.hook";
import axios from "axios";
import { getUser } from "../../../redux/slices/userSlice";

const EditEmail = () => {
  const isVisibleEmail = useSelector((state) => state.popup.visibleEmail);
  const email = useSelector((state) => state.users.user.email)
  const errorInput = `${m.inputError}`;
  const normalInput = `${m.input}`;
  const [visible, setVisible] = useState(false);
  const inactive = "popup__change";
  const active = "popup__change_opened";
  const { loading, request } = useHttp();
  const [changer, setChanger] = useState({
    email: "",
    inputCode: "",
  });
  const dispatch = useDispatch()
  const closePopup = () => {
    dispatch(activeEmail(true))
  }
  const User = (items) => {
    dispatch(getUser(items))
  }

  const changeInput = (event) => {
    setChanger({ ...changer, [event.target.name]: event.target.value });
  }

  const handleVerefyEmail = (value) => {
    console.log(value.email <= 6);
    if (value.email <= 6) {
      setVisible(false);
    } else if (!value.email) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }

  const updataData = () => {
    axios
      .get("http://localhost:3000/api/auth/get")
      .then((items) => {
        User(items.data);
        console.log(items.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const validate = (e) => {
    const errors = {};

    if (e.email?.indexOf("@") ===  -1) {
      errors.email = "В поле email должен быть знак @"
    } else if (e.email && e.email.length < 10) {
      errors.email = "Слишком короткая почта"
    } else if (e.email === email) {
      errors.email = " почту"
    }

    return errors;
  }

  const changeEmail = async () => {
    try {
      const data = await request("/api/change", "PUT", {...changer});
      console.log("Data", data);
      setTimeout(() => {
        closePopup()
        updataData()
      }, 1000);
    } catch (e) {}
  }

  const sentAgainCode = async () => {
    try {
      const data = await request("/api/verify", "POST", { ...changer });
      console.log("Data", data);
    } catch (e) {}
  }

  const onSubmit = async (value) => {
    handleVerefyEmail(value);
    console.log(value);
    setChanger({ ...value });
    try {
      const data = await request("/api/verify", "POST", { email: value.email });
      console.log("Data", data);
    } catch (e) {}
  }

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
                <h2 className={m.title}>Смена почты</h2>
              </div>
              <p className={m.text}>
                На указанный вами адрес электронной почты будет выслано письмо с
                кодом подтверждения, который нужно будет ввести на следующем
                шаге.
              </p>
            </div>
            <Form
              onSubmit={onSubmit}
              validate={validate}
              render={({ handleSubmit }) => (
                <form className={m.form} onSubmit={handleSubmit}>
                  <div className={m.formWrapper}>
                    <Field name="email">
                      {({ input, meta }) => (
                        <>
                          <input
                            type="text"
                            placeholder="Email"
                            className={meta.error ? errorInput : normalInput}
                            {...input}
                          />
                          {meta.touched && meta.error && (
                            <span className="error-text3">{meta.error}</span>
                          )}
                        </>
                      )}
                    </Field>
                    <br />
                    {visible ? (
                      <input
                        type="text"
                        name="inputCode"
                        placeholder="Код подтверждения"
                        onChange={changeInput}
                        className={normalInput}
                      />
                    ) : (
                      ""
                    )}

                    <div className={m.btnWrapper}>
                      {visible ? (
                        <button
                          type="button"
                          className={m.btnVerif}
                          disabled={loading}
                          onClick={() => sentAgainCode()}
                        >
                          Отправить код повторно
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className={m.btnVerif}
                          disabled={loading}
                        >
                          Отправить код подтверждения
                        </button>
                      )}
                      <div>
                        <button
                          className={m.btnSave}
                          type="submit"
                          onClick={() => changeEmail()}
                          disabled={loading}
                        >
                          Изменить
                        </button>
                        <button
                          className={m.btnCancel}
                          onClick={() => closePopup()}
                        >
                          Отмена
                        </button>
                      </div>
                    </div>
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

export default EditEmail;
