import ModifiedHeader from "../UI/Blocks/Header/ModifiedHeader/ModifiedHeader";
import m from "./Specialists.module.css";
import SpecialistsComponent from "./SpecialistsComponent/SpecialistsComponent";
import { useState } from "react";
import Pagination from "../UI/Pagination/Pagination";
import { NavLink } from "react-router-dom";
import SpecialistSearch from "../UI/Search/SpecialistSearch/SpecialistSearch";

function Specialists({ users, project, isAdmin }) {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const usersPerPage = 10; // Количество отображаемых пользователей на странице
  const usersOnCurrentPage = users.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  return (
    <div className={m.container}>
      <div className={m.containerwrapper}>
        <ModifiedHeader isAdmin={isAdmin} />
        {isAdmin ? (
          <>
            <div className={m.SpecialistsContainer}>
              <h1 className={m.title}>Специалисты</h1>
              <div className={m.navbarWrapper}>
                <SpecialistSearch />
              </div>

              <div className={m.usersContainer}>
                {usersOnCurrentPage.map((items, i) => (
                  <SpecialistsComponent items={items} key={i} />
                ))}
              </div>
              {users.length > 10 ? (
                <div className={m.pagination}>
                  <Pagination
                    totalPages={Math.ceil(users.length / usersPerPage)}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                  />
                </div>
              ) : (
                ""
              )}
            </div>
          </>
        ) : (
          <>
            {project.length === 0 ? (
              <div className={m.warning}>
                <div className={m.warningWrapper}>
                  <h1 className={m.title}>Специалисты</h1>
                  <p className={m.text}>
                    Для доступа к специалистам, пожалуйста,{" "}
                    <NavLink to="/profile/create" className={m.createProject}>
                      создайте свой проект в личном кабинете
                    </NavLink>{" "}
                    и добавьте минимум одну позицию специалиста.
                  </p>
                </div>
              </div>
            ) : (
              <div className={m.SpecialistsContainer}>
                <div className={m.navbarWrapper}>
                  <SpecialistSearch />
                </div>

                <div className={m.usersContainer}>
                  {usersOnCurrentPage.map((items, i) => (
                    <SpecialistsComponent items={items} key={i} />
                  ))}
                </div>
                {users.length > 10 ? (
                  <div className={m.pagination}>
                    <Pagination
                      totalPages={Math.ceil(users.length / usersPerPage)}
                      currentPage={currentPage}
                      onPageChange={handlePageChange}
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Specialists;
