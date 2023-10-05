import ModifiedHeader from "../UI/Blocks/Header/ModifiedHeader/ModifiedHeader";
import sendImage from "../../assets/images/send-plane-line.svg";
import notReadImage from "../../assets/images/check-line.svg";
import isReadImage from "../../assets/images/check-double-line.svg";
import m from "./Messenger.module.css";
import { useEffect, useState } from "react";
import UsersCatalog from "./UsersCatalog/UsersCatalog";
import { fetchCatalogData } from "../../redux/thunk/chatCatalog";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment-timezone";
import {
  connectToChatSocket,
  sendNewMessageSocket,
  leaveFromChatSocket,
} from "../../sockets/chatSocket";
import Skills from "../UI/Skills/Skills";
import { socket } from "../../sockets/socket";
import axios from "axios";
import { NavLink } from "react-router-dom";

function Messenger({ isAdmin }) {
  const dispatch = useDispatch();
  const { catalogData, catalogLoading, catalogError } = useSelector(
    (state) => state.chatCatalog
  );
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [config, setConfig] = useState({
    config: 0,
    height: "100px",
  });
  const [moveToChat, setMoveToChat] = useState(null);
  const position = moveToChat?.respond?.position;
  const ID = JSON.parse(localStorage.getItem("userData"));
  const userId = ID.userID;

  useEffect(() => {
    dispatch(fetchCatalogData(`api/${userId}/fetchCatalog`));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changer = (value) => {
    setNewMessage(value);
    if (value.length > 64) {
      setConfig({ config: 1, height: "100px" });
    } else if (value.length < 64) {
      setConfig({ config: 0 });
    }
  };

  const shadowSetMessage = async (value) => {
    axios.post(`/api/${userId}/sendNewMessage`, value);
  };

  const syncChatMessages = (chatId) => {
    axios.get(`/api/getMessage`).then((res) => {
      if (res.status === 200) {
        const data = res.data.filter((item) => item.chatID === chatId);

        const formattedMessages = data.map((item) => ({
          message: {
            authorID: item.authorID,
            msg: item.message.msg,
            chatID: item.chatID,
            sendTime: item.message.sendTime,
          },
        }));

        setMessages((prevMessages) => {
          const newMessages = { ...prevMessages };

          newMessages[chatId] = [];

          newMessages[chatId] = [...newMessages[chatId], ...formattedMessages];

          return newMessages;
        });
      }
    });
  };

  useEffect(() => {
    if (moveToChat !== null) {
      leaveFromChatSocket();
      connectToChatSocket(moveToChat);
      syncChatMessages(moveToChat?._id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moveToChat]);

  useEffect(() => {
    // Обработка события получения сообщения
    socket.on("receiveMessage", (message) => {
      setMessages((prevChatMessages) => {
        const newChatMessages = { ...prevChatMessages };
        const chatID = message.message.chatID;

        const newMessages = [...(newChatMessages[chatID] || []), message];

        return { ...prevChatMessages, [chatID]: newMessages };
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMessage = (value) => {
    const momentNow = moment();
    const formattedTime = momentNow.format("HH:mm");
    sendNewMessageSocket({
      myID: userId,
      msg: value,
      chatID: moveToChat?._id,
      sendTime: formattedTime,
    });
    shadowSetMessage({
      msg: value,
      chatID: moveToChat?._id,
      sendTime: formattedTime,
    });
    setNewMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    let value = e.target.value;
    if (!value.trim()) return;
    sendMessage(value);
  };

  const clickAddTag = () => {
    if (!newMessage?.trim()) return;
    sendMessage(newMessage);
  };

  return (
    <div className={m.container}>
      <div className={m.wrapper}>
        <ModifiedHeader isAdmin={isAdmin} />
        <div className={m.messengerWrapper}>
          {catalogData?.length > 0 ? (
            <div className={m.userList}>
              {catalogData?.map((users) => (
                <UsersCatalog
                  key={users._id}
                  userId={userId}
                  moveToChat={moveToChat}
                  setMoveToChat={setMoveToChat}
                  items={users}
                />
              ))}
            </div>
          ) : (
            <div className={m.userListWarning}>
              <p className={m.warningText}>У вас нет активных диалогов</p>
            </div>
          )}

          <div className={m.dialogContainer}>
            <div className={m.dialog}>
              {moveToChat !== null && (
                <div className={m.respond}>
                  <div className={m.respondWrapper}>
                    <div className={m.elementWrapper}>
                      <label className={m.lable}>Позиция:</label>
                      <div className={m.postWrapper}>
                        <h3 className={m.postJob}>{position?.jobPost}</h3>
                        <span className={m.postLevel}>
                          {position?.postLevel}
                        </span>
                      </div>
                    </div>
                    <div className={m.postTask}>
                      <div className={m.elementWrapper}>
                        <label className={m.lable}>Описание:</label>
                        <p className={m.postTask}>{position?.jobTask}</p>
                      </div>
                      <div className={m.elementWrapper}>
                        <label className={m.lable}>Навыки:</label>
                        <div className={m.tagsContainer}>
                          {position?.skills.map((items) => (
                            <div className={m.tagsWrapper} key={items}>
                              <h4 className={m.tags}>{items}</h4>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {messages[moveToChat?._id]?.map((message, index) => (
                <div
                  key={index}
                  className={
                    message?.message?.authorID === userId
                      ? m.myMessage
                      : m.message
                  }
                >
                  <div
                    className={
                      message?.message?.authorID === userId
                        ? m.myMsgWrapper
                        : m.msgWrapper
                    }
                  >
                    <div
                      className={
                        message?.message?.msg?.length < 10 ? m.slice : ""
                      }
                    >
                      <p className={m.text}>{message?.message?.msg}</p>
                      <div className={m.timeWrapper}>
                        <span className={m.time}>
                          {message?.message?.sendTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className={m.inputContainer}>
              <textarea
                className={m.input}
                style={
                  config.config === 1
                    ? { height: config.height }
                    : { height: "25px" }
                }
                name="input"
                value={newMessage}
                onChange={(e) => changer(e.target.value)}
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
