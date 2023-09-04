import Footer from "../../components/UI/Blocks/Footer/Footer";
// import ModifiedHeader from "../../components/Header/ModifiedHeader/ModifiedHeader";
import Profile from "../../components/Profile/Profile";
import "./MainProfileRoute.css";

function MainProfile({isAdmin}) {
  return (
    <div className="content">
      <div className="wrapper">
        <Profile isAdmin={isAdmin} />
      </div>
      <Footer />
    </div>
  );
}

export default MainProfile;
