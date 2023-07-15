import { useEffect } from "react";
import Footer from "../../components/Blocks/Footer/Footer";
import Specialists from "../../components/Specialists/Specialists";
import "./MainSpecialistsPage.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setIsFetching, setTotalPages, getUsers } from "../../redux/slices/paginationSlice";

function MainSpecialistsPage() {
  const ID = JSON.parse(localStorage.getItem("userData"));
  const userId = ID.userID;
  const currentPage = useSelector((state) => state.pagination.currentPage);
  const usersPerPage = useSelector((state) => state.pagination.usersPerPage);
  const users = useSelector((state) => state.pagination.users);
  const dispatch = useDispatch()

  const UpdataData = (items) => {
    dispatch(getUsers(items.data));
    // dispatch(setTotalPages(data.totalPages));
    // dispatch(setIsFetching(false));
  }
  
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

  return (
    <div className="content">
      <div className="wrapper">
        <Specialists users={users} />
      </div>
      <Footer />
    </div>
  );
}

export default MainSpecialistsPage;