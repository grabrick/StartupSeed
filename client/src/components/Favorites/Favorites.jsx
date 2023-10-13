import m from "./Favorites.module.css";
import ModifiedHeader from "../UI/Blocks/Header/ModifiedHeader/ModifiedHeader";
import NavBar from "../UI/NavBar/NavBar";
import { useEffect, useState } from "react";
import ProjectFavoritesComponent from "./ProjectFavoritesComponent/ProjectFavoritesComponent";
import SpecialistFavoritesComponent from "./SpecialistFavoritesComponent/SpecialistFavoritesComponent";
import { NavLink } from "react-router-dom";
import ActivitySelector from "../UI/Selectors/ActivitySelector/ActivitySelector";

function Favorites({ userData, isAdmin }) {
  const [isProject, setIsProject] = useState("Проекты");

  useEffect(() => {
    if (userData?.favorites?.project.length === 0) {
      setIsProject("Специалисты");
    }
  }, [userData?.favorites?.project]);
  return (
    <div className={m.container}>
      <div className={m.containerwrapper}>
        <ModifiedHeader isAdmin={isAdmin} />

        <div className={m.wrapper}>
          <h1 className={m.title}>Личный кабинет</h1>
          
          <div className={m.content}>
            <div className={m.bar}>
              <div className={m.profileWrapp}>
                <img
                  alt=""
                  src={`http://startupseed.ru/${userData.more?.pers?.profilePic}`}
                  className={m.avatar}
                />
                <p className={m.name}>
                  <span>{userData?.fname}</span> <span>{userData?.lname}</span>
                </p>
                {userData.more?.pers?.gender ? (
                  <div className={m.littleWrapp}>
                    <p className={m.genderText}>
                      {userData.more?.pers?.gender}
                    </p>
                    <p className={m.location}>
                      <span>{userData.more?.pers?.country}, </span>
                      <span>{userData.more?.pers?.city}</span>
                    </p>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <ActivitySelector />
              <>
                <NavBar currentBtn={"Favorite"} />
              </>
            </div>
            {userData.favorites?.project.length !== 0 ||
            userData.favorites?.users.length !== 0 ? (
              <div className={m.FavoritesContainer}>
                <div className={m.buttonWrapper}>
                  {userData.favorites?.project.length > 0 ? (
                    <button
                      className={isProject === "Проекты" ? m.active : m.button}
                      onClick={() => setIsProject("Проекты")}
                    >
                      Проекты
                    </button>
                  ) : (
                    ""
                  )}
                  {userData.favorites?.users.length > 0 ? (
                    <button
                      className={
                        isProject === "Специалисты" ? m.active : m.button
                      }
                      onClick={() => setIsProject("Специалисты")}
                    >
                      Специалисты
                    </button>
                  ) : (
                    ""
                  )}
                </div>
                {userData.favorites?.project.length > 0 && (
                  <p className={m.currentPosition}>
                    {isProject === "Проекты" && "Проекты"}
                  </p>
                )}
                {userData.favorites?.users.length > 0 && (
                  <p className={m.currentPosition}>
                    {isProject === "Специалисты" && "Специалисты"}
                  </p>
                )}
                <div className={m.finder}>
                  {isProject === "Проекты"
                    ? userData.favorites?.project.map((items) => (
                        <ProjectFavoritesComponent
                          key={items.postID}
                          projectItems={items}
                        />
                      ))
                    : userData.favorites?.users.map((items) => (
                        <SpecialistFavoritesComponent
                          key={items.userID}
                          userItems={items}
                        />
                      ))}
                </div>
              </div>
            ) : (
              <div className={m.FavoritesContainer}>
                <p className={m.textError}>
                  У вас нет добавленных проектов или специалистов, перейдите в
                  раздел с поиском{" "}
                  <NavLink className={m.link} to="/project">
                    проeкта
                  </NavLink>{" "}
                  или{" "}
                  <NavLink className={m.link} to="/specialists">
                    специалиста
                  </NavLink>
                  .
                </p>
              </div>
            )}
            {/* Only Project */}
            {/* {userData.favorites?.project.length !== 0 &&
          userData.favorites?.users.length === 0 ? (
            <div className={m.FavoritesContainer}>
              <div className={m.buttonWrapper}>
                {userData.favorites?.project.length > 0 ? (
                  <button
                    className={m.button}
                    onClick={() => setIsProject("Проекты")}
                  >
                    Проекты
                  </button>
                ) : (
                  ""
                )}
              </div>
              <p className={m.currentPosition}>
                {isProject === "Специалисты" ? "Проекты" : "Специалисты"}
              </p>
              <div className={m.finder}>
                {isProject === "Специалисты"
                  ? userData.favorites?.project.map((items) => (
                      <ProjectFavoritesComponent
                        key={items.postID}
                        projectItems={items}
                      />
                    ))
                  : userData.favorites?.users.map((items) => (
                      <SpecialistFavoritesComponent
                        key={items.userID}
                        userItems={items}
                      />
                    ))}
              </div>
            </div>
          ) : (
            ""
          )} */}

            {/* Only Users */}
            {/* {userData.favorites?.project.length === 0 &&
          userData.favorites?.users.length !== 0 ? (
            <div className={m.FavoritesContainer}>
              <div className={m.buttonWrapper}>
                {userData.favorites?.users.length > 0 ? (
                  <button
                    className={m.button}
                    onClick={() => setIsProject("Специалисты")}
                  >
                    Специалисты
                  </button>
                ) : (
                  ""
                )}
              </div>
              <p className={m.currentPosition}>
                {isProject === "Проекты" ? "Специалисты" : "Проекты"}
              </p>
              <div className={m.finder}>
                {isProject === "Проекты"
                  ? userData.favorites?.users.map((items) => (
                      <SpecialistFavoritesComponent
                        key={items.userID}
                        userItems={items}
                      />
                    ))
                  : userData.favorites?.project.map((items) => (
                      <ProjectFavoritesComponent
                        key={items.postID}
                        projectItems={items}
                      />
                    ))}
              </div>
            </div>
          ) : (
            ""
          )} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Favorites;
