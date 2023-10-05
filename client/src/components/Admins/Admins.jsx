import { NavLink } from "react-router-dom";
import m from "./Admins.module.css";
import { useEffect, useState } from "react";
// import axios from "axios";
// import { getProject, getUsers } from "../../redux/slices/paginationSlice";
import { searchResult, setClearData } from "../../redux/thunk/userSlice";
import { useDispatch, useSelector } from "react-redux";
// import ProjectComponent from "../Project/ProjectComponent/ProjectComponent";
// import SpecialistsComponent from "../Specialists/SpecialistsComponent/SpecialistsComponent";
import SpecialistControl from "./SpecialistControl/SpecialistControl";
import UserProfilePopup from "../UI/Popup/UserProfilePopup/UserProfilePopup";
import PreLoader from "../UI/PreLoader/PreLoader";
import { fetchUsersData } from "../../redux/thunk/userSlice";
import ProjectProfilePopup from "../UI/Popup/ProjectProfilePopup/ProjectProfilePopup";
import ProjectControl from "./ProjectControl/ProjectControl";
import { fetchProjectData, searchProjectResult, setProjectClearData } from "../../redux/thunk/projectSlice";

function Admins() {
  const dispatch = useDispatch();
  const [activeCategory, setActiveCategory] = useState(null);
  const [isActiveProfile, setIsActiveProfile] = useState(false);
  const [isActiveProject, setIsActiveProject] = useState(false);
  const [currentProjectData, setCurrentProjectData] = useState(null);
  // const [subCategory, setSubCategory] = useState(null)
  const [inputValue, setInputValue] = useState("");
  const [currentProfileData, setCurrentProfileData] = useState(null);
  const [isCurrentAction, setIsCurrentAction] = useState(null);
  const [isCurrentProjectAction, setIsCurrentProjectAction] = useState(null);
  const [isActive, setIsActive] = useState(null);
  const currentPage = useSelector((state) => state.pagination.currentPage);
  const usersPerPage = useSelector((state) => state.pagination.usersPerPage);
  // const project = useSelector((state) => state.pagination.project);
  const { userData, userLoading, userError } = useSelector(state => state.usersThunks);
  const {projectData, projectLoading, projectError} = useSelector(state => state.projectThunks);
  const catalog = [{ category: "Проекты" }, { category: "Специалисты" }];
  const ID = JSON.parse(localStorage.getItem("userData"));
  const userId = ID.userID;
  // const UpdataProjectData = (items) => dispatch(getProject(items.data));

  const handleChangeInput = (e) => {
    const value = e.target.value;
    if (activeCategory === "Специалисты") {
      setInputValue(value);
      dispatch(searchResult(value));
    } else if (activeCategory === "Проекты") {
      setInputValue(value);
      dispatch(searchProjectResult(value));
    }
  };

  useEffect(() => {
    if (isActive) {
      setIsActive(null)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory])
  
  useEffect(() => {
    if (isActive === null) {
      dispatch(setClearData());
      dispatch(setProjectClearData())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  useEffect(() => {
    if (isCurrentAction === "access") {
      dispatch(
        fetchUsersData(
          `api/${userId}/getNotVerefyUser?page=${currentPage}&perPage=${usersPerPage}`
        )
      );
      setIsCurrentAction(null);
      setIsActiveProfile(false)
    } else if (isCurrentAction === "deny") {
      dispatch(
        fetchUsersData(
          `api/${userId}/getVerefyUser?page=${currentPage}&perPage=${usersPerPage}`
        )
      );
      setIsActiveProfile(false)
      setIsCurrentAction(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCurrentAction]);

  useEffect(() => {
    if (isCurrentProjectAction === "access") {
      dispatch(
        fetchProjectData(
          `api/${userId}/getNotVerefyProject?page=${currentPage}&perPage=${usersPerPage}`
        )
      );
      setIsActiveProject(false)
      setIsCurrentProjectAction(null);
    } else if (isCurrentProjectAction === "deny") {
      dispatch(
        fetchProjectData(
          `api/${userId}/getVerefyProject?page=${currentPage}&perPage=${usersPerPage}`
        )
      );
      setIsActiveProject(false)
      setIsCurrentProjectAction(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCurrentProjectAction]);

  const projectOnCurrentPage = projectData?.data?.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const usersOnCurrentPage = userData?.data?.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const chandePage = (config) => {
    if (config === "Не проверенные") {
      setIsActive(config);
      // setSubCategory
      dispatch(setClearData());
      dispatch(
        fetchUsersData(
          `api/${userId}/getNotVerefyUser?page=${currentPage}&perPage=${usersPerPage}`
        )
      );
    } else {
      setIsActive(config);
      dispatch(setClearData());
      dispatch(
        fetchUsersData(
          `api/${userId}/getVerefyUser?page=${currentPage}&perPage=${usersPerPage}`
        )
      );
    }
  };

  const chandeProjectPage = (config) => {
    if (config === "Не проверенные") {
      setIsActive(config);
      dispatch(setProjectClearData())
      dispatch(
        fetchProjectData(
          `api/${userId}/getNotVerefyProject?page=${currentPage}&perPage=${usersPerPage}`
        )
      );
    } else {
      setIsActive(config);
      dispatch(setProjectClearData())
      dispatch(
        fetchProjectData(
          `api/${userId}/getVerefyProject?page=${currentPage}&perPage=${usersPerPage}`
        )
      );
    }
  };

  return (
    <div className={m.container}>
      <div className={m.wrapper}>
        <div className={m.navCatalog}>
          {catalog.map((i) => (
            <NavLink
              key={i.category}
              className={`${m.button} ${
                activeCategory === i.category ? m.active : ""
              }`}
              onClick={() => setActiveCategory(i.category)}
            >
              {i.category}
            </NavLink>
          ))}
        </div>
        {activeCategory === "Специалисты" && (
          <div className={m.filterWrapper}>
            <div className={m.buttonWrapper}>
              <button
                className={isActive === "Проверенные" ? m.activeBtn : m.btn}
                onClick={() => chandePage("Проверенные")}
              >
                Проверенные
              </button>
              <button
                className={isActive === "Не проверенные" ? m.activeBtn : m.btn}
                onClick={() => chandePage("Не проверенные")}
              >
                Не проверенные
              </button>
            </div>
            <div className={m.searchElement}>
              <input
                onChange={(e) => handleChangeInput(e)}
                value={inputValue}
                className={m.search}
                placeholder="Поиск по имени"
              ></input>
            </div>
          </div>
        )}
        {activeCategory === "Проекты" && (
          <div className={m.projectFilterWrapper}>
            <div className={m.buttonWrapper}>
              <button
                className={isActive === "Проверенные" ? m.activeBtn : m.btn}
                onClick={() => chandeProjectPage("Проверенные")}
              >
                Проверенные
              </button>
              <button
                className={isActive === "Не проверенные" ? m.activeBtn : m.btn}
                onClick={() => chandeProjectPage("Не проверенные")}
              >
                Не проверенные
              </button>
            </div>
            <div className={m.searchElement}>
              <input
                onChange={(e) => handleChangeInput(e)}
                value={inputValue}
                className={m.search}
                placeholder="Поиск по имени"
              ></input>
            </div>
          </div>
        )}
        <div className={m.content}>
          {activeCategory === "Проекты" && (
            <>
              {projectOnCurrentPage?.length > 0 ? (
                <>
                  {projectOnCurrentPage?.map((items) => (
                    <ProjectControl
                      items={items}
                      key={items._id}
                      setIsActiveProject={setIsActiveProject}
                      setCurrentProjectData={setCurrentProjectData}
                    />
                  ))}
                </>
              ) : (
                <>
                  {projectLoading ? (
                    <PreLoader color="black" w="150" h="150" />
                  ) : (
                    <>
                      {isActive === null ? (
                        <p className={m.warningTitle}>Выберете Раздел</p>
                      ) : (
                        <p className={m.warningTitle}>Тут пусто</p>
                      )}
                    </>
                  )}
                </>
              )}
            </>
          )}
          {activeCategory === "Специалисты" && (
            <>
              {usersOnCurrentPage?.length > 0 ? (
                <>
                  {usersOnCurrentPage?.map((items, i) => (
                    <SpecialistControl
                      items={items}
                      currentProfileData={currentProfileData}
                      setCurrentProfileData={setCurrentProfileData}
                      setIsActiveProfile={setIsActiveProfile}
                      key={i}
                    />
                  ))}
                </>
              ) : (
                <>
                  {userLoading ? (
                    <PreLoader color="black" w="150" h="150" />
                  ) : (
                    <>
                      {isActive === null ? (
                        <p className={m.warningTitle}>Выберете Раздел</p>
                      ) : (
                        <p className={m.warningTitle}>Тут пусто</p>
                      )}
                    </>
                  )}
                </>
              )}
            </>
          )}

          <div className={m.warning}>
            {activeCategory === null && <h3>Выберете категорию</h3>}
          </div>
        </div>
      </div>
      {isActiveProfile && (
        <UserProfilePopup
          isActiveProfile={isActiveProfile}
          setIsActiveProfile={setIsActiveProfile}
          currentProfileData={currentProfileData}
          setCurrentProfileData={setCurrentProfileData}
          setIsCurrentAction={setIsCurrentAction}
        />
      )}
      {isActiveProject && (
        <ProjectProfilePopup
          setIsCurrentProjectAction={setIsCurrentProjectAction}
          setCurrentProjectData={setCurrentProjectData}
          setIsActiveProject={setIsActiveProject}
          isActiveProject={isActiveProject}
          currentProjectData={currentProjectData}
        />
      )}
    </div>
  );
}

export default Admins;
