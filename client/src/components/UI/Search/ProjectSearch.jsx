import { NavLink } from "react-router-dom";
import m from "./Search.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setSearchProjectQuery } from "../../../redux/slices/paginationSlice";

function ProjectSearch() {
  const dispatch = useDispatch();
  const allProject = useSelector((state) => state.pagination.project);
  const [searchResults, setSearchResults] = useState([]);
  const [searchInput, setSearchInput] = useState({
    input: "",
    postLevel: "Любой",
  });
  const changeHandler = (event) => {
    setSearchInput({ ...searchInput, [event.target.name]: event.target.value });
  };

  const handleSearch = async () => {
    setSearchResults([]);

    const value = {
      input: searchInput.input,
      postLevel: searchInput.postLevel,
    };
    const { input, postLevel } = value;
    if (input || postLevel) {
      const filteredProject = allProject.filter((project) => {
        const filteredPosts = project.projectPost.filter((post) =>
          post.jobPost.includes(input)
        );
        return filteredPosts.length > 0;
      });

      setSearchResults(filteredProject);

      await dispatch(
        setSearchProjectQuery({
          filtered: filteredProject,
          input: value.input,
          postLevel: value.postLevel,
        })
      );
    }
  };
  return (
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
  );
}

export default ProjectSearch;
