import deleteIcon from "../../../assets/images/delete-bin-line.svg";
import viewProfile from "../../../assets/images/share-forward-line.svg";
import m from "./UsersCatalog.module.css";

function UsersCatalog({ items, userId, moveToChat, setMoveToChat }) {
  const interlocutor = items?.users?.interlocutor;
  const author = items?.users?.author;
  const chatID = items?._id
  const moveToCurrentChat = () => {
    setMoveToChat(items)
    // console.log(items);
  };


  return (
    <div className={moveToChat?._id === chatID ? m.activeUserList : m.userListWrapper} onClick={() => moveToCurrentChat(items)}>
      {interlocutor?.interlocutorID === userId ? (
        <>
          <div className={m.imgWrapper}>
            <img className={m.img} src={author?.profilePic} alt="" />
          </div>
          <div className={m.textWrapper}>
            <div className={m.wrappWrapper}>
              <p className={m.name}>
                {author?.fname} {author?.lname}
              </p>
              <div className={m.funcImage}>
                <img className={m.icon} src={viewProfile} alt="" />
                <img className={m.icon} src={deleteIcon} alt="" />
              </div>
            </div>
            {author?.more?.job?.post.length > 0 ? (
              <p className={m.job}>{author?.more?.job?.post}</p>
            ) : (
              <>
                {author.isAdmin === true ? (
                  <p className={m.prefix}>Администратор</p>
                ) : (
                  <div className={m.hidden}></div>
                )}
              </>
            )}
          </div>
        </>
      ) : (
        <>
          <div className={m.imgWrapper}>
            <img className={m.img} src={interlocutor?.profilePic} alt="" />
          </div>
          <div className={m.textWrapper}>
            <div className={m.wrappWrapper}>
              <p className={m.name}>
                {interlocutor?.fname} {interlocutor?.lname}
              </p>
              <div className={m.funcImage}>
                <img className={m.icon} src={viewProfile} alt="" />
                <img className={m.icon} src={deleteIcon} alt="" />
              </div>
            </div>
            {interlocutor?.more?.job?.post.length > 0 ? (
              <p className={m.job}>{interlocutor?.more?.job?.post}</p>
            ) : (
              <>
                {interlocutor.isAdmin === true ? (
                  <p className={m.prefix}>Администратор</p>
                ) : (
                  <div className={m.hidden}></div>
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default UsersCatalog;
