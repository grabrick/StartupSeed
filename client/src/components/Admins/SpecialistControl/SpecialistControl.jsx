import m from "./SpecialistControl.module.css";
import baseImage from '../../../assets/images/NotFound.svg'

function SpecialistControl({items, setIsActiveProfile, setCurrentProfileData}) {
  const data = items;

  const onOpenProfile = () => {
    setIsActiveProfile(true)
    setCurrentProfileData(data)
  }

  return (
      <div className={m.container} onClick={() => onOpenProfile()}>
        <div className={m.wrapper}>
          <div className={m.avatar}>
            <img
              className={m.image}
              src={ data.more?.pers?.profilePic ? `http://startupseed.ru/${data.more?.pers?.profilePic}` : baseImage}
              alt=""
            />
          </div>
          <div className={m.info}>
            <p className={m.title}>
              {data.fname} {data.lname}
            </p>
            <p className={m.description}>
              {data.more?.job?.post} {data.more?.job?.postLevel}
            </p>
            <div className={m.tagsWrapper}>
              {data.more?.job?.skills?.map((tag, index) => (
                <div key={index} className={m.tags}>
                  <span className={m.tag}>{tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
}

export default SpecialistControl;
