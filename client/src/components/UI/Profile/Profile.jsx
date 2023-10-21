import m from "./Profile.module.css";

function Profile({data}) {
  return (
    <div className={m.container}>
      <img
        alt=""
        src={`http://startupseed.ru/${data.more?.pers?.profilePic}`}
        className={m.avatar}
      />
      <div className={m.nameWrapper}>
        <div className={m.name}>
          <span>{data?.fname}</span> <span>{data?.lname}</span>
        </div>
        {data?.isAdmin === true && <span>Администратор</span>}
      </div>

      {data.more?.pers?.gender !== "Не указан" && (
        <div className={m.littleWrapp}>
          <p className={m.genderText}>{data.more?.pers?.gender}</p>
          <div className={m.location}>
            {data.more?.pers?.country && data.more?.pers?.city ? (
              <>
                <span>{data.more?.pers?.country}, </span>
                <span>{data.more?.pers?.city}</span>
              </>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
