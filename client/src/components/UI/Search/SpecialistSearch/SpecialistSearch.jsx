import { useEffect, useState } from "react";
import m from "./SpecialistSearch.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../../../../redux/slices/paginationSlice";
import PostSelector from "../../Selectors/PostSelector/PostSelector";

function SpecialistSearch() {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.pagination.users);
  const changeHandler = (event) => {
    setSearchInput({ ...searchInput, [event.target.name]: event.target.value });
  };
  const [searchInput, setSearchInput] = useState({
    input: "",
    postLevel: "Любой",
  });
  const handleSearch = () => {
    const value = {
      input: searchInput.input,
      postLevel: searchInput.postLevel,
    };
    const { input, postLevel } = value;
    if (input || postLevel) {
      const filteredUsers = allUsers.filter((user) => {
        const includeItems = user?.more?.job?.post?.includes(input);
        return includeItems;
      });
      dispatch(
        setSearchQuery({
          filtered: filteredUsers,
          input: value.input,
          postLevel: value.postLevel,
        })
      );
    }
  };

  useEffect(() => {
    dispatch(
      setSearchQuery({
        filtered: [],
        input: "",
        postLevel: "Любой",
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput?.input?.length === 0]);

  return (
    <div className={m.container}>
      <div className={m.wrapper}>
        <input
          className={m.findInput}
          placeholder="Должность"
          type="text"
          name="input"
          value={searchInput.input}
          onChange={changeHandler}
        />
        <PostSelector setSearchInput={setSearchInput} searchInput={searchInput} />
        <button className={m.findButton} onClick={() => handleSearch()}>
          Найти
        </button>
      </div>
    </div>
  );
}

export default SpecialistSearch;
