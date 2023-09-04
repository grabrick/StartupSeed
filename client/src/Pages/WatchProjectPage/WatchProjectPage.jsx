/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import Footer from "../../components/UI/Blocks/Footer/Footer";
import './WatchProjectPage.css'
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import WatchProject from "../../components/WatchProject/WatchProject";
import { getCurrentProject, getFavorite } from "../../redux/slices/currentProjectSlice";

function WatchProjectPage({isAdmin}) {
  const currentLink = window.location.href;
  const findProjectID = currentLink.toString().slice(30, 62);
  const ID = JSON.parse(localStorage.getItem("userData"));
  const userId = ID.userID;
  const currentProject = useSelector((state) => state.currentProject.currentProject);
  const dispatch = useDispatch()
  const getProject = (items) => {
    dispatch(getCurrentProject(items));
  };

  const getFavoriteProject = (items) => {
    dispatch(getFavorite(items));
  };

  useEffect(() => {
    axios.get(`/api/${userId}/getFavorite`).then((items) => {
      getFavoriteProject(items.data.project)
    });
  }, []);
  
  useEffect(() => {
    axios
    .get(`/api/get/currentProject/${findProjectID}`)
    .then((items) => {
      getProject(items.data)
      // console.log(items.data);
    })
    .catch((e) => {
      console.log(e);
    });
  }, [])

  return (
    <div className="content">
      <div className="wrapper">
        <WatchProject isAdmin={isAdmin} items={currentProject} projectId={findProjectID} />
      </div>
      <Footer />
    </div>
  );
}

export default WatchProjectPage;