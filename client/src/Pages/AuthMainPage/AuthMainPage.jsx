import { useDispatch } from "react-redux";
import AboutInfo from "../../components/AboutInfo/AboutInfo";
import Footer from "../../components/Footer/Footer";
import ModifiedHeader from "../../components/Header/ModifiedHeader/ModifiedHeader";
import { getUser } from "../../redux/slices/userSlice";
import { useEffect } from "react";
import axios from "axios";

function ModifiedMainPage() {
  const dispatch = useDispatch();
  const User = (items) => {
    dispatch(getUser(items));
  };

  useEffect(() => {
    axios.get("http://localhost:3000/api/auth/get")
      .then((items) => {
        User(items.data.more);
        console.log(items.data.more);
      })
      .catch((e) => {
        console.log(e);
      });
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
