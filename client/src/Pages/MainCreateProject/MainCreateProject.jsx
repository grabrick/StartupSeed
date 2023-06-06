import Footer from "../../components/Blocks/Footer/Footer";
import CreateProject from "../../components/CreateProject/CreateProject";
import "./MainCreateProject.css";

function MainCreateProject() {
  return (
    <div className="content">
      <div className="wrapper">
        <CreateProject />
      </div>
      <Footer />
    </div>
  );
}

export default MainCreateProject;