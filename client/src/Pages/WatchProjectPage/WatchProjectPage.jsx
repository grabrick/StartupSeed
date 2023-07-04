/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import Footer from "../../components/Blocks/Footer/Footer";
import './WatchProjectPage.css'
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import WatchProject from "../../components/WatchProject/WatchProject";
import { getCurrentProject } from "../../redux/slices/currentProject";

function WatchProjectPage() {
  const currentLink = window.location.href;
  const findProjectID = currentLink.toString().slice(30, 62);
  const currentProject = useSelector((state) => state.currentProject.currentProject);
  const dispatch = useDispatch()
  const getProject = (items) => {
    dispatch(getCurrentProject(items));
  };

  useEffect(() => {
    axios
    .get(`/api/get/currentProject/${findProjectID}`)
    .then((items) => {
      getProject(items.data)
      console.log(items.data);
    })
    .catch((e) => {
      console.log(e);
    });
  }, [])

  return (
    <div className="content">
      <div className="wrapper">
        <WatchProject items={currentProject} projectId={findProjectID} />
      </div>
      <Footer />
    </div>
  );
}

export default WatchProjectPage;