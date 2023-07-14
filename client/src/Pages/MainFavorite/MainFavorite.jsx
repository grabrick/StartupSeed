import { useEffect } from "react";
import Footer from "../../components/Blocks/Footer/Footer";
import Favorites from "../../components/Favorites/Favorites";
import axios from "axios";
import { getUser } from "../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

function MainFavorite() {
  const ID = JSON.parse(localStorage.getItem("userData"));
  const userId = ID.userID;
  const dispatch = useDispatch();
  const data = useSelector((state) => state.users.user);

  const User = (items) => {
    dispatch(getUser(items));
  };

  useEffect(() => {
    axios
      .get(`/api/auth/${userId}/get`)
      .then((items) => {
        User(items.data);
      })
      .catch((e) => {
        console.log(e);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="content">
      <div className="wrapper">
        <Favorites userData={data} />
      </div>
      <Footer />
    </div>
  );
}

export default MainFavorite;
