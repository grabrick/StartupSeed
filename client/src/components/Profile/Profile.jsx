import ModifiedHeader from "../Header/ModifiedHeader/ModifiedHeader";
import pen from "../../assets/images/edit-line.svg";
import lines from "../../assets/images/menu-3-line.svg";
import doors from "../../assets/images/door-open-line.svg";
import gear from "../../assets/images/settings-5-line.svg";
import star from "../../assets/images/star-line.svg";
import cases from "../../assets/images/briefcase-line.svg";
import m from "./Profile.module.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPerson } from "../../redux/slices/personalSlice";
import axios from "axios";

function Profile() {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.personal.person)
  const Person = (items) => {
    dispatch(getPerson(items))
  }

  useEffect(() => {
    axios.get('http://localhost:3000/api/auth/get')
    .then((items) => {
      Person(items.data.more.pers)
    }).catch((e) => {
      console.log(e)
    })
  }, [])

  return (
    <div className={m.container}>
      <ModifiedHeader />

      <h1 className={m.title}>Личный кабинет</h1>

      <div className={m.wrapper}>
        <div className={m.bar}>
          <div className={m.profileWrapp}>
            <img alt="" src={data.profilePic} className={m.avatar}></img>
            <p className={m.name}><span>{data.fname}</span>  <span>{data.lname}</span></p>
          </div>
          <select className={m.selector} name="" id="">
            <option value="В поиске проекта">В поиске проекта</option>
            <option value="Не ищу проект">Не ищу проект</option>
          </select>
          <NavLink className={m.button} to="/profile">
            <button className={m.button}>
              <div className={m.btnWrapp}>
                <img src={lines} alt="" />
                <span className={m.span}>Профиль</span>
              </div>
              <NavLink to="/edit">
                <img className={m.editPen} src={pen} alt="" />
              </NavLink>
            </button>
          </NavLink>
          <NavLink className={m.button} to="/">
            <button className={m.button}>
              <div className={m.btnWrapp}>
                <img src={cases} alt="" />
                <span className={m.span}>Мои проекты</span>
              </div>
            </button>
          </NavLink>
          <NavLink className={m.button} to="/">
            <button className={m.button}>
              <div className={m.btnWrapp}>
                <img src={star} alt="" />
                <span className={m.span}>Избранное</span>
              </div>
            </button>
          </NavLink>
          <NavLink className={m.button} to="/">
            <button className={m.button}>
              <div className={m.btnWrapp}>
                <img src={gear} alt="" />
                <span className={m.span}>Настройки</span>
              </div>
            </button>
          </NavLink>
          <NavLink className={m.button} to="/">
            <button className={m.button}>
              <div className={m.btnWrapp}>
                <img src={doors} alt="" />
                <span className={m.span}>Выйти</span>
              </div>
            </button>
          </NavLink>
        </div>

        <div className={m.infoBar}>
          <div className={m.infoWrapp}>
            <h3 className={m.infoTitle}>Профессиональная информация</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
