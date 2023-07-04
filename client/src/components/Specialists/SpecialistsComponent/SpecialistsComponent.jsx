import { NavLink } from "react-router-dom";
import m from "./SpecialistsComponent.module.css";

function SpecialistsComponent(items) {
  const data = items.items;
  // console.log(data);
  return (
    <NavLink className={m.link} to={`/specialist/${data._id}`}>
      <div className={m.container}>
        <div className={m.wrapper}>
          <div className={m.avatar}>
            <img className={m.image} src={data.more?.pers?.profilePic} alt="" />
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
    </NavLink>
  );
}

export default SpecialistsComponent;
