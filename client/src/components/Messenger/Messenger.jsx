import ModifiedHeader from "../Blocks/Header/ModifiedHeader/ModifiedHeader";
import sendImage from "../../assets/images/send-plane-line.svg";
import m from "./Messenger.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";

function Messenger() {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const ID = JSON.parse(localStorage.getItem("userData"));
  const userId = ID.userID;

  const user = [];
  console.log(value);
  const handleKeyDown = (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    let value = e.target.value;
    if (!value.trim()) return;
    console.log(value);
    // addTags({ value: skills, id: items.items.id });
  };

  const clickAddTag = () => {
    // if (!skills?.trim()) return;
    // addTags({ value: skills, id: items.items.id });
  };

  return (
    <div className={m.container}>
      <div className={m.wrapper}>
        <ModifiedHeader />
        <div className={m.messengerWrapper}>
          <div className={m.userList}>
            {user.map((users) => {
              return <div></div>;
            })}
          </div>
          <div className={m.dialogContainer}>
            <div className={m.dialog}>
              {user.map((users) => {
                return <div></div>;
              })}
            </div>
            <div className={m.inputContainer}>
              <textarea
                className={m.input}
                name="input"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={handleKeyDown}
              ></textarea>
              <div className={m.imageWrapper}>
                <img
                  src={sendImage}
                  className={m.sendImage}
                  onClick={() => clickAddTag()}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messenger;
