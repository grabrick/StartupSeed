import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/UI/Blocks/Footer/Footer";
import Project from "../../components/Project/Project";
import "./MainFindProject.css";
import { getProject } from "../../redux/slices/paginationSlice";
import { useEffect } from "react";
import axios from "axios";

function MainFindProject({isAdmin}) {
  const ID = JSON.parse(localStorage.getItem("userData"));
  const userId = ID.userID;
  const currentPage = useSelector((state) => state.pagination.currentPage);
  const usersPerPage = useSelector((state) => state.pagination.usersPerPage);
  const project = useSelector((state) => state.pagination.project);
  const dispatch = useDispatch()

  const UpdataData = (items) => {
    dispatch(getProject(items.data));
    // dispatch(setTotalPages(data.totalPages));
    // dispatch(setIsFetching(false));
  }

  useEffect(() => {
    axios
      .get(`/api/${userId}/users/project?page=${currentPage}&perPage=${usersPerPage}`)
      .then((items) => {
        UpdataData(items.data);
      })
      .catch((e) => {
        console.log(e);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className="content">
      <div className="wrapper">
        <Project isAdmin={isAdmin} project={project} />
      </div>
      <Footer />
    </div>
  );
}

export default MainFindProject;