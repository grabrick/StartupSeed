import { useEffect, useState } from "react";
import m from "./ActivitySelector.module.css";
import axios from "axios";
import arrowDown from '../../../../assets/images/arrow-down.svg'
import arrowUp from '../../../../assets/images/arrow-up.svg'
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../../redux/slices/userSlice";

function ActiveSelector({}) {
  const ID = JSON.parse(localStorage.getItem("userData"));
  const userId = ID?.userID;
  const dispatch = useDispatch()
  const data = useSelector((state) => state.users.user);
  const [isActive, setIsActive] = useState(false)
  const User = (items) => {
    dispatch(getUser(items));
  };
  const defaultValue = ["В поиске проекта", "Не ищу проект"]

  const handleClick = (value) => {
    axios.put(`/api/auth/${userId}/changeActivity`, {value: value})
        .then(res => {
            if(res.status === 200) {
                setIsActive(!isActive)
                User(res.data)
            }
        })
  }

  return (
    <div className={isActive === true ? m.acitveContainer : m.container}>
        <input className={m.input} type="hidden" />
        <div className={m.selectHead} onClick={() => setIsActive(!isActive)}>
            <p className={m.text}>{data?.activity}</p>
            <img src={isActive === true ? arrowUp : arrowDown} alt="" />
        </div>
        <ul className={isActive === true ? m.selectList : m.notActive}>
            <div className={m.selectListWrapper}>
            {defaultValue.map(items => (
                <li className={m.listItem} onClick={() => handleClick(items)}>{items}</li>
            ))}
            </div>
        </ul>
    </div>
  );
}

export default ActiveSelector;
