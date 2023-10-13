import { useState } from "react";
import ModifiedHeader from "../UI/Blocks/Header/ModifiedHeader/ModifiedHeader";
import Pagination from "../UI/Pagination/Pagination";
import m from "./Project.module.css";
import ProjectComponent from "./ProjectComponent/ProjectComponent";
import ProjectSearch from "../UI/Search/ProjectSearch/ProjectSearch";

function Project({ project, isAdmin }) {
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10; // Количество отображаемых пользователей на странице
  const usersOnCurrentPage = project.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className={m.container}>
      <div className={m.containerwrapper}>
        <ModifiedHeader isAdmin={isAdmin} />

        <div className={m.projectContainer}>
          
          <div className={m.navbarContainer}>
            <h1 className={m.title}>Проекты</h1>
            <ProjectSearch />
          </div>

          {usersOnCurrentPage.map((items) => (
            <ProjectComponent items={items} key={items._id} />
          ))}
        </div>

        {project.length > 10 ? (
          <div className={m.pagination}>
            <Pagination
              totalPages={Math.ceil(Project.length / usersPerPage)}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Project;
