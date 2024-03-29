import { NavLink } from "react-router-dom";
import m from "./SpecialistsComponent.module.css";
import baseImage from '../../../assets/images/NotFound.svg'
import Skills from "../../UI/Skills/Skills"

const SpecialistsComponent = (items) => {
  const data = items.items;
  return (
    <NavLink className={m.link} to={`/specialist/${data._id}`}>
      <div className={m.container}>
        <div className={m.wrapper}>
          <div className={m.avatar}>
            <img className={m.image} src={data.more?.pers?.profilePic ? `http://startupseed.ru/${data.more?.pers?.profilePic}` : baseImage} alt="" />
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
                <Skills key={index} skills={tag} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </NavLink>
  );
}

export default SpecialistsComponent;
