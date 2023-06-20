import Footer from "../../components/Blocks/Footer/Footer";
import EditProject from "../../components/EditProject/EditProject";
import "./MainProjectEdit.css";

function MainProjectEdit() {
  return (
    <div className="content">
      <div className="wrapper">
        <EditProject />
      </div>
      <Footer />
    </div>
  );
}

export default MainProjectEdit;