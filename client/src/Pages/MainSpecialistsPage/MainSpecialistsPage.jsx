import { useEffect } from "react";
import Footer from "../../components/UI/Blocks/Footer/Footer";
import Specialists from "../../components/Specialists/Specialists";
import "./MainSpecialistsPage.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setIsFetching, setTotalPages, getUsers } from "../../redux/slices/paginationSlice";
import { getProject } from "../../redux/slices/userSlice";

function MainSpecialistsPage({isAdmin}) {
  const ID = JSON.parse(localStorage.getItem("userData"));
  const userId = ID.userID;
  const currentPage = useSelector((state) => state.pagination.currentPage);
  const usersPerPage = useSelector((state) => state.pagination.usersPerPage);
  const users = useSelector((state) => state.pagination.users);
  const findProject = useSelector((state) => state.users.myProject)
  const dispatch = useDispatch()

  const UpdataData = (items) => {
    dispatch(getUsers(items.data));
  }

  const Project = (items) => {
    dispatch(getProject(items));
  };
  
  useEffect(() => {
    axios
      .get(`/api/auth/${userId}/getAll?page=${currentPage}&perPage=${usersPerPage}`)
      .then((items) => {
        UpdataData(items.data);
      })
      .catch((e) => {
        console.log(e);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    axios
      .get(`/api/${userId}/project`)
      .then((items) => {
        Project(items.data);
      })
      .catch((e) => {
        console.log(e);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="content">
      <div className="wrapper">
        <Specialists isAdmin={isAdmin} users={users} project={findProject} />
      </div>
      <Footer />
    </div>
  );
}

export default MainSpecialistsPage;