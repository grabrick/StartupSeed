import Footer from "../../components/UI/Blocks/Footer/Footer";
import MyProject from "../../components/MyProject/MyProject";
import "./MainProject.css";

function MainProject({isAdmin}) {
  return (
    <div className="content">
      <div className="wrapper">
        <MyProject isAdmin={isAdmin} />
      </div>
      <Footer />
    </div>
  );
}

export default MainProject;