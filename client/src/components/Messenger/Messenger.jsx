import ModifiedHeader from "../UI/Blocks/Header/ModifiedHeader/ModifiedHeader";
import sendImage from "../../assets/images/send-plane-line.svg";
import m from "./Messenger.module.css";
import { useEffect, useRef, useState } from "react";
import UsersCatalog from "./UsersCatalog/UsersCatalog";
import { fetchCatalogData } from "../../redux/thunk/chatCatalog";
import { closeChat, openChat } from "../../redux/slices/messengerSlice"
import { useDispatch, useSelector } from "react-redux";
import NotificationSound from "../../assets/sound/Notif.wav";
// import { audio } from '../../assets/sound/Notif.mp3'
import moment from "moment-timezone";
import {
  connectToChatSocket,
  sendNewMessageSocket,
  leaveFromChatSocket,
} from "../../sockets/chatSocket";
import { socket } from "../../sockets/socket";
import axios from "axios";
import RespondMessage from "../UI/RespondMessage/RespondMessage";

function Messenger({ isAdmin }) {
  const dispatch = useDispatch();
  const { catalogData } = useSelector(
    (state) => state.chatCatalog
  );
  const isOpen = useSelector(state => state.messenger.isOpen)
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const audioPlayer = useRef(null);
  const [config, setConfig] = useState({
    config: 0,
    height: "100px",
  });
  const [moveToChat, setMoveToChat] = useState(null);
  const position = moveToChat?.respond?.position;
  const ID = JSON.parse(localStorage.getItem("userData"));
  const userId = ID.userID;

  const playNotificationSound = () => {
    audioPlayer.current.play();
  };

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchCatalogData(`api/${userId}/fetchCatalog`));
    }
    const intervalId = setInterval(fetchData, 10000);
    fetchData();
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moveToChat]);

  const changer = (value) => {
    setNewMessage(value);
    if (value.length > 64) {
      setConfig({ config: 1, height: "100px" });
    } else if (value.length < 64) {
      setConfig({ config: 0 });
    }
  };

  const shadowSetMessage = async (value) => {
    axios.post(`/api/${userId}/sendNewMessage`, value).then((res) => {
      if (res.status === 200) {
        syncChatMessages(moveToChat?._id);
      }
    });
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
    if(moveToChat?.isOpen === true) {
      dispatch(openChat())
    } else if(moveToChat?.isOpen === false) {
      dispatch(closeChat())
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moveToChat])

  useEffect(() => {
    // Обработка события получения сообщения
    socket.on("receiveMessage", (message) => {
      playNotificationSound()
      setMessages((prevChatMessages) => {
        const newChatMessages = { ...prevChatMessages };
        const chatID = message.message.chatID;

        const newMessages = [...(newChatMessages[chatID] || []), message];

        return { ...prevChatMessages, [chatID]: newMessages };
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socket.on('chatStatusUpdate', (value) => {
      if(value.isOpen === true) {
        dispatch(openChat())
      } else if(value.isOpen === false) {
        dispatch(closeChat())
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
      <audio ref={audioPlayer} src={NotificationSound} />
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
                <RespondMessage 
                  position={position} 
                  moveToChat={moveToChat} 
                  setMoveToChat={setMoveToChat}
                />
              )}
              {moveToChat === null && (
                <div className={m.warningWrapper}>
                  <h3 className={m.warningTitle}>Выберете чат</h3>
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
            <div className={isOpen === false ? m.inputDisabled : m.inputContainer}>
              <textarea
                className={isOpen === false ? m.disable : m.input}
                style={
                  config.config === 1
                    ? { height: config.height }
                    : { height: "25px" }
                }
                name="input"
                value={newMessage}
                disabled={isOpen === false ? true : false}
                onChange={(e) => changer(e.target.value)}
                onKeyDown={handleKeyDown}
              ></textarea>
              <button
                className={isOpen === false ? m.disabled : m.btn}
                onClick={() => clickAddTag()}
              >
                <img src={sendImage} className={m.sendImage} alt="" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messenger;
