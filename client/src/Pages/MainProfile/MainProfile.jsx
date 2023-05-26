import Footer from "../../components/Blocks/Footer/Footer";
// import ModifiedHeader from "../../components/Header/ModifiedHeader/ModifiedHeader";
import Profile from "../../components/Profile/Profile";
import "./MainProfileRoute.css";

function MainProfile() {
  return (
    <div className="content">
      <div className="wrapper">
        <Profile />
      </div>
      <Footer />
    </div>
  );
}

export default MainProfile;
