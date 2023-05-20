// import { useState } from "react";
// import { useHttp } from "../../../hooks/http.hook";
import "./EditPassword.css";
import m from "./EditPassword.module.css";
import { useDispatch, useSelector } from "react-redux";
import { activePassword } from "../../../redux/slices/popupSlice";

const EditPassword = () => {
  const isVisibleEmail = useSelector((state) => state.popup.visiblePassword);
  const dispatch = useDispatch();
  const inactive = "popup__change";
  const active = "popup__change_opened";

  const closePopup = () => {
    dispatch(activePassword(true))
  }
  //   const { loading, request } = useHttp();
  //   const [form, setForm] = useState({
  //     email: "",
  //     password: "",
  //   });

  //   const changeHandler = (event) => {
  //     setForm({ ...form, [event.target.name]: event.target.value });
  //   };

  //   const loginHandler = async () => {
  //     try {
  //       const data = await request("/api/auth/login", "POST", { ...form });
  //       auth.login(data.token, data.userId);
  //     } catch (e) {}
  //   };

  return (
    <>
      <div className={isVisibleEmail ? active : inactive} onClick={() => closePopup()}>
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
            <form className={m.form} >
              <div className={m.formWrapper}>
                <input type="text" placeholder="Email" className={m.input} /><br/>
                <div className={m.btnWrapper}>
                <button type="submit" className={m.btnSave}>
                  Изменить
                </button>
                <button className={m.btnCancel} onClick={() => closePopup()} >
                  Отмена
                </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditPassword;