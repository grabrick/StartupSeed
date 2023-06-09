import ModifiedHeader from "../Blocks/Header/ModifiedHeader/ModifiedHeader";
import sendImage from "../../assets/images/send-plane-line.svg";
import m from "./Messenger.module.css";
import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import socketIOClient from "socket.io-client";

function Messenger({ socket }) {
  // const socket = socketIOClient.connect('http://localhost:5000');
  // const dispatch = useDispatch();
  // const [value, setValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const ID = JSON.parse(localStorage.getItem("userData"));
  const userId = ID.userID;
  const user = [];

  useEffect(() => {
    socket.on("newMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);

  const sendMessage = (value) => {
    socket.emit("sendMessage", {
      yourID: userId,
      content: [{
        message: value
      }],
    });
    setNewMessage("");
    // console.log(value);
  };

  const handleKeyDown = (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    let value = e.target.value;
    if (!value.trim()) return;
    sendMessage(value);
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
              {/* {user.map((users) => {
                return <div></div>;
              })} */}
              {messages.map((message) => (
                console.log(message)
              ))}
            </div>
            <div className={m.inputContainer}>
              <textarea
                className={m.input}
                name="input"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
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
