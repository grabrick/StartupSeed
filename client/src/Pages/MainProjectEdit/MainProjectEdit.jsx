import Footer from "../../components/UI/Blocks/Footer/Footer";
import EditProject from "../../components/EditProject/EditProject";
import "./MainProjectEdit.css";

function MainProjectEdit({isAdmin}) {
  return (
    <div className="content">
      <div className="wrapper">
        <EditProject isAdmin={isAdmin} />
      </div>
      <Footer />
    </div>
  );
}

export default MainProjectEdit;