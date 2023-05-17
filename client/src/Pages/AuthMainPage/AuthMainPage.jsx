import { useDispatch } from "react-redux";
import AboutInfo from "../../components/Blocks/AboutInfo/AboutInfo";
import Footer from "../../components/Blocks/Footer/Footer";
import ModifiedHeader from "../../components/Blocks/Header/ModifiedHeader/ModifiedHeader";
import { getUser } from "../../redux/slices/userSlice";
import { useEffect } from "react";
import axios from "axios";
import { getSkills } from "../../redux/slices/skillsSlice";

function ModifiedMainPage() {
  const dispatch = useDispatch();
  const User = (items) => {
    dispatch(getUser(items));
  };
  const Skills = (items) => {
    dispatch(getSkills(items));
  };

  useEffect(() => {
    axios.get("/api/auth/get")
      .then((items) => {
        User(items.data);
        Skills(items.data.more.job.skills)
        console.log(items.data);
      })
      .catch((e) => {
        console.log(e);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  return (
    <>
      <ModifiedHeader />
      <AboutInfo />
      <Footer />
    </>
  );
}

export default ModifiedMainPage;
