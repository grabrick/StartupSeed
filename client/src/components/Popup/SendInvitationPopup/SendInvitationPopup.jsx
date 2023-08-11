import axios from "axios";
import m from "./SendInvitationPopup.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SendInvitationPopup({ close, items, project }) {
  const [isVisible] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [currentMessage, setCurrentMessage] = useState(null)
  const navigate = useNavigate();
  const ID = JSON.parse(localStorage.getItem("userData"));
  const userId = ID.userID;
  const findCurrentProject = project.find(
    (item) => item.projectName === currentProject
  );
  const sendInvite = () => {
    axios.post(`/api/${userId}/sendInvite`, {
      projectOwnerObject: items,
      sendValue: {currentProject, currentPosition, currentMessage }
    }).then(res => {
      if(res.status === 200) {
        navigate('/messenger')
      }
    })
  }
  return (
    <form className={isVisible ? `${m.inactive}` : `${m.active}`} onClick={() => close(false)}>
      <div className={m.wrapper} onClick={(e) => e.stopPropagation()}>
        <p className={m.title}>
          Пришлашение для:{" "}
          <span className={m.name}>{`${items.fname} ${items.lname}`}</span>
        </p>

        <div className={m.messegeContainer}>
          <div className={m.messegeSelector}>
            <select
              className={m.select}
              defaultValue={"Не указан"}
              name="project"
              onChange={(e) => setCurrentProject(e.target.value)}
            >
              <option value="Не указан">Не указан</option>
              {project.map((item) => (
                <option value={item.projectName}>{item.projectName}</option>
              ))}
            </select>

            {currentProject && (
              <select
                className={m.select}
                defaultValue={"Не указан"}
                name="projectPost"
                onChange={(e) => setCurrentPosition(e.target.value)}
              >
                <option value="Не указан">Не указан</option>
                {findCurrentProject?.projectPost.map((item) => (
                  <option value={item.postLevel}>{item.postLevel}</option>
                ))}
              </select>
            )}
          </div>
          <textarea onChange={(e) => setCurrentMessage(e.target.value)} name="sendMessage" className={m.textArea}></textarea>
        </div>

        <div className={m.buttonWrapper}>
          <button type="button" className={m.button} onClick={() => close(false)}>
            Отменить
          </button>
          <button type="button" className={m.button} onClick={() => sendInvite()}>
            Отправить
          </button>
        </div>
      </div>
    </form>
  );
}

export default SendInvitationPopup;
