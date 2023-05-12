import { useDispatch } from "react-redux";
import AboutInfo from "../../components/Blocks/AboutInfo/AboutInfo";
import Footer from "../../components/Blocks/Footer/Footer";
import ModifiedHeader from "../../components/Blocks/Header/ModifiedHeader/ModifiedHeader";
import { getUser } from "../../redux/slices/userSlice";
import { useEffect } from "react";
import axios from "axios";

function ModifiedMainPage() {
  const dispatch = useDispatch();
  const User = (items) => {
    dispatch(getUser(items));
  };

  useEffect(() => {
    axios.get("/api/auth/get")
      .then((items) => {
        User(items.data);
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
