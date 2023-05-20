import { getUser } from "../../redux/slices/userSlice";
import { useEffect, useState } from "react";
import { activeEmail, activePassword } from "../../redux/slices/popupSlice";
import { useDispatch, useSelector } from "react-redux";
// import { useHttp } from "../../hooks/http.hook";
import axios from "axios";
import ModifiedHeader from "../Blocks/Header/ModifiedHeader/ModifiedHeader";
import NavBar from "../NavBar/NavBar";
import EditEmail from "../Popup/EditEmail/EditEmail";
import EditPassword from "../Popup/EditPassword/EditPassword";
import PhoneInput from "react-phone-number-input";
import m from "./Settings.module.css";
import 'react-phone-number-input/style.css'
import './Settings.css'

function Settings() {
  const data = useSelector((state) => state.users.user);
  const isVisibleEmail = useSelector((state) => state.popup.visibleEmail);
  const isVisiblePassword = useSelector((state) => state.popup.visiblePassword);
  const [number, setNumber] = useState()
  // const [isPopupReg, setIsPopupReg] = useState(false);
  // const [isPopupLog, setIsPopupLog] = useState(false);
  // const { loading, request } = useHttp();
  const dispatch = useDispatch();
  const User = (items) => {
    dispatch(getUser(items));
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/auth/get")
      .then((items) => {
        User(items.data);
        console.log(items.data);
      })
      .catch((e) => {
        console.log(e);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [form, setForm] = useState({
    phoneNumber: "",
    timeZone: "",
  });
  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handlePopupEmailClick = () => {
    dispatch(activeEmail(false))
  };

  const handlePopupPasswordClick = () => {
    dispatch(activePassword(false))
  };

  const onClickDeleteUser = (id) => {
    console.log(id);
    try {
      axios.get(`/api/auth/delete/${id}`)
        .then(items => {
          console.log(items);
        })
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className={m.container}>
      <ModifiedHeader />

      <h1 className={m.title}>Личный кабинет</h1>

      <div className={m.wrapper}>
        <div className={m.bar}>
          <div className={m.profileWrapp}>
            <img
              alt=""
              src={data.more?.pers?.profilePic}
              className={m.avatar}
            ></img>
            <p className={m.name}>
              <span>{data.more?.pers?.fname}</span>{" "}
              <span>{data.more?.pers?.lname}</span>
            </p>
            <div className={m.littleWrapp}>
              <p className={m.genderText}>{data.more?.pers?.gender}</p>
              <p className={m.location}>
                <span>{data.more?.pers?.country}</span>,{" "}
                <span>{data.more?.pers?.city}</span>
              </p>
            </div>
          </div>
          <select className={m.selector} name="" id="">
            <option value="В поиске проекта">В поиске проекта</option>
            <option value="Не ищу проект">Не ищу проект</option>
          </select>
          <>
            <NavBar currentBtn={"Setting"} />
          </>
        </div>

        <div className={m.infoBar}>
            <div className={m.inputWrapper}>
              <div className={m.textWrapper}>
                <span className={m.span}>E-mail</span>
                <p className={m.inputData}>{data?.email}</p>
              </div>
              <button className={m.btn} onClick={() => handlePopupEmailClick()}>Изменить</button>
            </div>
            <div className={m.inputWrapper}>
              <div className={m.textWrapper}>
                <span className={m.span}>Номер телефона</span>
                <PhoneInput
                  className={m.number}
                  type="text"
                  value={number}
                  onChange={setNumber}
                  // onChange={changeHandler}
                  // value={form.phoneNumber}
                />
              </div>
              <button className={m.btn}>Изменить</button>
            </div>
            <div className={m.inputWrapper}>
              <div className={m.textWrapper}>
                <span className={m.span}>Пароль</span>
                <p className={m.inputData}>Обновлен</p>
              </div>
              <button className={m.btn} onClick={() => handlePopupPasswordClick()}>Изменить</button>
            </div>
            <div className={m.inputWrapper}>
              <div className={m.textWrapper}>
                <span className={m.span}>Часовой пояс</span>
                <select className={m.selectTime} onChange={changeHandler} name="timeZone" defaultValue="UTC 0" id="">
                  <option value="UTC -12">UTC -12</option>
                  <option value="UTC -11">UTC -11</option>
                  <option value="UTC -10">UTC -10</option>
                  <option value="UTC -9">UTC -9</option>
                  <option value="UTC -8">UTC -8</option>
                  <option value="UTC -7">UTC -7</option>
                  <option value="UTC -6">UTC -6</option>
                  <option value="UTC -5">UTC -5</option>
                  <option value="UTC -4">UTC -4</option>
                  <option value="UTC -3">UTC -3</option>
                  <option value="UTC -2">UTC -2</option>
                  <option value="UTC -1">UTC -1</option>
                  <option value="UTC 0">UTC 0</option>
                  <option value="UTC +1">UTC +1</option>
                  <option value="UTC +2">UTC +2</option>
                  <option value="UTC +3">UTC +3</option>
                  <option value="UTC +4">UTC +4</option>
                  <option value="UTC +5">UTC +5</option>
                  <option value="UTC +6">UTC +6</option>
                  <option value="UTC +7">UTC +7</option>
                  <option value="UTC +8">UTC +8</option>
                  <option value="UTC +9">UTC +9</option>
                  <option value="UTC +10">UTC +10</option>
                  <option value="UTC +11">UTC +11</option>
                  <option value="UTC +12">UTC +12</option>
                </select>
              </div>
              <button className={m.btn}>Изменить</button>
            </div>
            <button className={m.deleteBtn} onClick={() => onClickDeleteUser(data._id)}>Удалить аккаунт</button>
        </div>
      </div>
      {isVisibleEmail ? "" : <EditEmail /> }
      {isVisiblePassword ? "" : <EditPassword /> }
    </div>
  );
}

export default Settings;
