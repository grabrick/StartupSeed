import "./EditEmail.css";
import m from "./EditEmail.module.css";
import { useDispatch, useSelector } from "react-redux";
import { activeEmail } from "../../../../redux/slices/popupSlice";
import { useState } from "react";
import { Field, Form } from "react-final-form";
import axios from "axios";
import { getUser } from "../../../../redux/slices/userSlice";

const EditEmail = () => {
  const isVisibleEmail = useSelector((state) => state.popup.visibleEmail);
  const email = useSelector((state) => state.users.user.email)
  const errorInput = `${m.inputError}`;
  const normalInput = `${m.input}`;
  const [visible, setVisible] = useState(false);
  const inactive = "popup__change";
  const active = "popup__change_opened";
  const ID = JSON.parse(localStorage.getItem("userData"));
  const userId = ID.userID
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
      .get(`/api/auth/${userId}/get`)
      .then((items) => {
        User(items.data);
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
      errors.email = "Почтовый адрес совпадает"
    }

    return errors;
  }

  const changeEmail = () => {
    axios.put(`/api/${userId}/change`, { ...changer })
      .then(response => {
        if(response.status === 200) {
          closePopup()
          updataData()
        }
      })
  }

  const sentAgainCode = () => {
    axios.post('/api/verify', { ...changer })
  }

  const onSubmit = (value) => {
    handleVerefyEmail(value);
    setChanger({ ...value });
    axios.post('/api/verify', { email: value.email })
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
                          onClick={() => sentAgainCode()}
                        >
                          Отправить код повторно
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className={m.btnVerif}
                        >
                          Отправить код подтверждения
                        </button>
                      )}
                      <div>
                        <button
                          className={m.btnSave}
                          type="button"
                          onClick={() => changeEmail()}
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
