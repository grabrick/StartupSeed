import { useDispatch } from "react-redux";
import AboutInfo from "../../components/UI/Blocks/AboutInfo/AboutInfo";
import Footer from "../../components/UI/Blocks/Footer/Footer";
import ModifiedHeader from "../../components/UI/Blocks/Header/ModifiedHeader/ModifiedHeader";
import { getUser } from "../../redux/slices/userSlice";
import { useEffect } from "react";
import axios from "axios";
import { getSkills } from "../../redux/slices/skillsSlice";
import "./AuthRoute.css";

function ModifiedMainPage({isAdmin}) {
  const dispatch = useDispatch();
  const User = (items) => {
    dispatch(getUser(items));
  };
  const Skills = (items) => {
    dispatch(getSkills(items));
  };

  useEffect(() => {
    const ID = JSON.parse(localStorage.getItem("userData"));
    const userId = ID.userID;
    axios
      .get(`/api/auth/${userId}/get`)
      .then((items) => {
        User(items.data);
        Skills(items.data.more.job.skills);
      })
      .catch((e) => {
        console.log(e);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="content">
      <ModifiedHeader isAdmin={isAdmin} />
      <div className="wrapper">
        <AboutInfo />
      </div>
      <Footer />
    </div>
  );
}

export default ModifiedMainPage;
