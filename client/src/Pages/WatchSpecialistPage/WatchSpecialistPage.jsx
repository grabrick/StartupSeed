/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Footer from "../../components/UI/Blocks/Footer/Footer";
import WatchSpecialist from "../../components/WatchSpecialist/WatchSpecialist";
import './WatchSpecialistPage.css'
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getFavorite, getUser } from "../../redux/slices/currentUser";

function WatchSpecialistPage({isAdmin}) {
  const currentLink = window.location.href;
  const findUserID = currentLink.toString().slice(33, 62);
  const ID = JSON.parse(localStorage.getItem("userData"));
  const userId = ID.userID;
  const dispatch = useDispatch()
  const [project, setProject] = useState([])
  const getUsers = (items) => {
    dispatch(getUser(items));
  };
  const getFavoriteProject = (items) => {
    dispatch(getFavorite(items));
  };
  const currentUser = useSelector((state) => state.currentUser.currentUser);

  useEffect(() => {
    axios.get(`/api/${userId}/getFavorite`).then((items) => {
      getFavoriteProject(items.data.users)
    });
    axios.get(`/api/get/currentUser/${findUserID}`).then((items) => {
      getUsers(items.data)
    })
    axios.get(`/api/${userId}/project`).then(items => {
      setProject(items.data);
    })
  }, []);

  return (
    <div className="content">
      <div className="wrapper">
        <WatchSpecialist isAdmin={isAdmin} project={project} userID={findUserID} items={currentUser} />
      </div>
      <Footer />
    </div>
  );
}

export default WatchSpecialistPage;