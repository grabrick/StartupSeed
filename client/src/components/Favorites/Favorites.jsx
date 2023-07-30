import m from "./Favorites.module.css";
import ModifiedHeader from "../Blocks/Header/ModifiedHeader/ModifiedHeader";
import NavBar from "../NavBar/NavBar";
import { useState } from "react";
import ProjectFavoritesComponent from "./ProjectFavoritesComponent/ProjectFavoritesComponent";
import SpecialistFavoritesComponent from "./SpecialistFavoritesComponent/SpecialistFavoritesComponent";

function Favorites({ userData }) {
  const [isProject, setIsProject] = useState("Проекты");
  return (
    <div className={m.container}>
      <div className={m.wrapper}>
        <ModifiedHeader />
        <h1 className={m.title}>Личный кабинет</h1>
        <div className={m.contentWrapper}>
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
                  <p className={m.genderText}>{userData.more?.pers?.gender}</p>
                  <p className={m.location}>
                    <span>{userData.more?.pers?.country}, </span>
                    <span>{userData.more?.pers?.city}</span>
                  </p>
                </div>
              ) : (
                ""
              )}
            </div>
            <select className={m.selector} name="" id="">
              <option value="В поиске проекта">В поиске проекта</option>
              <option value="Не ищу проект">Не ищу проект</option>
            </select>
            <>
              <NavBar currentBtn={"Favorite"} />
            </>
          </div>
          {userData.favorites?.project.length !== 0 &&
          userData.favorites?.users.length !== 0 ? (
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
              {userData.favorites?.project.length > 0 &&
              userData.favorites?.users.length > 0 ? (
                <p className={m.currentPosition}>
                  {isProject === "Проекты" ? "Проекты" : "Специалисты"}
                </p>
              ) : (
                ""
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
            ""
          )}
          {/* Only Project */}
          {userData.favorites?.project.length !== 0 &&
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
          )}

          {/* Only Users */}
          {userData.favorites?.project.length === 0 &&
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
          )}
        </div>
      </div>
    </div>
  );
}

export default Favorites;
