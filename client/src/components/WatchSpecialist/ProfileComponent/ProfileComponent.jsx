import m from "./ProfileComponent.module.css";
import baseImage from '../../../assets/images/NotFound.svg'

function ProfileComponent({ items }) {
  const hb = items?.more?.pers?.hb;
  const hbSlice = hb?.slice(0, 10);
  const hbSliced = hbSlice?.replace(/-/g, ".");

  return (
    <div className={m.container}>
      <div className={m.wrapper}>
        {items?.more?.pers?.profilePic ? (
          <div className={m.avatar}>
            <img
              className={m.image}
              src={`http://startupseed.ru/${items.more?.pers?.profilePic}`}
              alt=""
            />
          </div>
        ) : (
          ""
        )}
        <div className={m.pesonalInfo}>
          <div className={m.nameWrapper}>
            <div className={m.nameWrapp}>
              <p className={m.name}>{items?.fname}</p>
              <p className={m.name}>{items?.lname}</p>
            </div>
            <div className={m.activeWrapper}>
              <p className={m.isActive}>В поиске проекта</p>
            </div>
          </div>
          <div className={m.moreInfoWrapper}>
            {items.more?.pers?.gender || items.more?.pers?.hb ? (
              <div className={m.maleWrapper}>
                <p className={m.list}>
                  Пол:
                  <span className={m.info1}>{items?.more?.pers?.gender}</span>
                </p>
                <p className={m.list}>
                  Дата рождения:<span className={m.info2}>{hbSliced}</span>
                </p>
                <p className={m.list}>
                  Страна:
                  <span className={m.info3}>{items?.more?.pers?.country}</span>
                </p>
                <p className={m.list}>
                  Город:
                  <span className={m.info4}>{items?.more?.pers?.city}</span>
                </p>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileComponent;
