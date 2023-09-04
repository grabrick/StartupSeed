import Footer from "../../components/UI/Blocks/Footer/Footer";
import CreateProject from "../../components/CreateProject/CreateProject";
import "./MainCreateProject.css";

function MainCreateProject({isAdmin}) {
  return (
    <div className="content">
      <div className="wrapper">
        <CreateProject isAdmin={isAdmin} />
      </div>
      <Footer />
    </div>
  );
}

export default MainCreateProject;