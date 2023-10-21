import axios from "axios";
import Skills from "../Skills/Skills";
import m from "./RespondMessage.module.css";
import { setIsCloseChatSocket, setIsOpenChatSocket } from "../../../sockets/chatSocket";

function RespondMessage({
  position,
  moveToChat,
  setMoveToChat,
  setIsClosed,
  setIsOpened,
}) {
  const ID = JSON.parse(localStorage.getItem("userData"));
  const userId = ID.userID;
  // const dispatch = useDispatch()
  const onClickIsOpened = () => {
    axios.put("/api/setIsOpen", { id: moveToChat._id }).then((res) => {
      if (res.status === 200) {
        setMoveToChat(res.data);
        if(res.data.isOpen === true) {
          setIsOpenChatSocket()
        } else if(res.data.isOpen === false) {
          setIsCloseChatSocket()
        }
      }
    });
  };

  return (
    <div className={m.respond}>
      <div className={m.respondWrapper}>
        <div className={m.elementWrapper}>
          <label className={m.lable}>Позиция:</label>
          <div className={m.postWrapper}>
            <h3 className={m.postJob}>{position?.jobPost}</h3>
            <span className={m.postLevel}>{position?.postLevel}</span>
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
              {position?.skills.map((items, index) => (
                <Skills skills={items} key={index} />
              ))}
            </div>
          </div>
        </div>
        <div className={m.respondMessageWrapper}>
          <div className={m.timeWrapper}>
            <label className={m.lable}>Время отправки:</label>
            <h4 className={m.sendTime}>{moveToChat?.respond?.sendTime}</h4>
          </div>
          <div>
            <label className={m.lable}>Сопроводительное письмо:</label>
            <p className={m.msgText}>{moveToChat?.respond?.respondMessage}</p>
          </div>
          {userId === moveToChat?.users?.interlocutor?.interlocutorID && (
            <div className={m.buttonWrapper}>
              <label className={m.lable}>Открыть доступ?</label>
              <button className={m.button} onClick={() => onClickIsOpened()}>
                {moveToChat?.isOpen === false ? "Да" : "Нет"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RespondMessage;
