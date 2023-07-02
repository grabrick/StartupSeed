import { useState } from "react";
import ModifiedHeader from "../Blocks/Header/ModifiedHeader/ModifiedHeader";
import Pagination from "../Pagination/Pagination";
import m from "./Project.module.css";
import ProjectComponent from "./ProjectComponent/ProjectComponent";
import { useDispatch, useSelector } from "react-redux";
import { setSearchProjectQuery } from "../../redux/slices/paginationSlice";
import { NavLink } from "react-router-dom";

function Project({ project }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState({
    input: "",
    postLevel: "Любой",
  });
  const dispatch = useDispatch();
  const allProject = useSelector((state) => state.pagination.project);
  const usersPerPage = 10; // Количество отображаемых пользователей на странице
  const usersOnCurrentPage = project.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const changeHandler = (event) => {
    setSearchInput({ ...searchInput, [event.target.name]: event.target.value });
  };

  const handleSearch = () => {
    const value = {
      input: searchInput.input,
      postLevel: searchInput.postLevel,
    };
    const { input, postLevel } = value;
    if (input || postLevel) {
      const filteredUsers = allProject.filter((project) => {
        const filteredPosts = project.projectPost.filter((post) =>
          post.jobPost.includes(input)
        );
        return filteredPosts.length > 0;
      });
      dispatch(
        setSearchProjectQuery({
          filtered: filteredUsers,
          input: value.input,
          postLevel: value.postLevel,
        })
      );
    }
  };
  

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className={m.container}>
      <div className={m.containerwrapper}>
        <ModifiedHeader />

        <div className={m.navbarContainer}>
          <h1 className={m.title}>Проекты</h1>
          <div className={m.navbarWrapper}>
            <input
              className={m.findInput}
              placeholder="Должность"
              type="text"
              name="input"
              value={searchInput.input}
              onChange={changeHandler}
            />
            <select
              className={m.selector}
              defaultValue="Любой"
              name="postLevel"
              value={searchInput.postLevel}
              onChange={changeHandler}
            >
              <option value="Любой">Любой</option>
              <option value="Junior">Junior</option>
              <option value="Middle">Middle</option>
              <option value="Senior">Senior</option>
              <option value="Lead">Lead</option>
            </select>
            <button className={m.findButton} onClick={() => handleSearch()}>
              Найти
            </button>
            <NavLink to="/profile/create">
              <button className={m.createButton}>Создать проект</button>
            </NavLink>
          </div>
        </div>

        <div className={m.projectContainer}>
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
