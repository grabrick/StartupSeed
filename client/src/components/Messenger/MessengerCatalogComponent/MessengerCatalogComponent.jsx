import axios from "axios";
import deleteIcon from "../../../assets/images/delete-bin-line.svg";
import viewProfile from "../../../assets/images/share-forward-line.svg";
import m from "./MessengerCatalogComponent.module.css";

function MessengerCatalogComponent({items}) {
  const name = `${items.projectOwnerObject?.fname}, ${items.projectOwnerObject?.lname}`
  const slicedName =  name.slice(0, 30)
  const ID = JSON.parse(localStorage.getItem("userData"));
  const userId = ID.userID;
  const onClickDelete = (id) => {
    axios.delete(`api/${userId}/deleteUser/${id}`)
  }

  return (
    <div key={items._id} className={m.userListWrapper}>
      <div className={m.imgWrapper}>
        <img
          className={m.img}
          src={items.projectOwnerObject?.profilePic}
          alt=""
        />
      </div>
      <div className={m.textWrapper}>
        <div className={m.wrappWrapper}>
          <p className={m.name}>{slicedName}</p>
          <div className={m.funcImage}>
            <img className={m.icon} src={viewProfile} alt="" />
            <img className={m.icon} onClick={() => onClickDelete(items._id)} src={deleteIcon} alt="" />
          </div>
        </div>
        <p className={m.job}>{items.projectOwnerObject?.jobPost}</p>
      </div>
    </div>
  );
}

export default MessengerCatalogComponent;
