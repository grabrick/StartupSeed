import Footer from "../../components/Blocks/Footer/Footer";
import MyProject from "../../components/MyProject/MyProject";
import "./MainProject.css";

function MainProject() {
  return (
    <div className="content">
      <div className="wrapper">
        <MyProject />
      </div>
      <Footer />
    </div>
  );
}

export default MainProject;