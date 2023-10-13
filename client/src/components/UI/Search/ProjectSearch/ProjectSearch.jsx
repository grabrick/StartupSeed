import { NavLink } from "react-router-dom";
import m from "./ProjectSearch.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setSearchProjectQuery } from "../../../../redux/slices/paginationSlice";
import PostSelector from '../../Selectors/PostSelector/PostSelector'
import { useNavigate } from 'react-router-dom';

function ProjectSearch() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  useEffect(() => {
    dispatch(setSearchProjectQuery({
      filtered: [],
      input: '',
      postLevel: 'Любой'
    }))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput?.input?.length === 0])

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
      <PostSelector setSearchInput={setSearchInput} searchInput={searchInput} />
      <button className={m.findButton} onClick={() => handleSearch()}>Найти</button>
      <button className={m.createButton} onClick={() => navigate('/profile/create')}>Создать проект</button>
    </div>
  );
}

export default ProjectSearch;
