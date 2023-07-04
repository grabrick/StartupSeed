import { useEffect } from "react";
import Footer from "../../components/Blocks/Footer/Footer";
import WatchSpecialist from "../../components/WatchSpecialist/WatchSpecialist";
import './WatchSpecialistPage.css'
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "../../redux/slices/currentUser";

function WatchSpecialistPage() {
  const currentLink = window.location.href;
  const findProjectID = currentLink.toString().slice(33, 62);
  // console.log(findProjectID);
  const dispatch = useDispatch()
  const getUsers = (items) => {
    dispatch(getUser(items));
  };

  useEffect(() => {
    axios
    .get(`/api/get/currentUser/${findProjectID}`)
    .then((items) => {
      getUsers(items.data)
      console.log(items.data);
    })
    .catch((e) => {
      console.log(e);
    });
  }, [])

  return (
    <div className="content">
      <div className="wrapper">
        <WatchSpecialist />
      </div>
      <Footer />
    </div>
  );
}

export default WatchSpecialistPage;