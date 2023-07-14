import m from "./SpecialistFavoritesComponent.module.css";

function SpecialistFavoritesComponent({ userItems }) {
  console.log(userItems);
  return (
    <div className={m.container}>
      <div className={m.wrapper}>
        <div className={m.avatar}>
          <img src={userItems?.profilePic} className={m.image} alt="" />
        </div>
        <div className={m.nameWrapper}>
          <span className={m.name}>{userItems?.fname}</span>
          {", "}
          <span className={m.name}>{userItems?.lname}</span>
        </div>

        <div className={m.postWrapper}>
          <span className={m.post}>{userItems?.post}</span>
          {", "}
          <span className={m.postLevel}>{userItems?.postLevel}</span>
        </div>
      </div>
    </div>
  );
}

export default SpecialistFavoritesComponent;
