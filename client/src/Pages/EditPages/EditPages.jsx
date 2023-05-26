import EditProfile from "../../components/EditProfile/EditProfile";
import Footer from "../../components/Blocks/Footer/Footer";
import './EditPagesRoute.css'

function EditPages() {
  return (
    <div className="content">
      <div className="wrapper">
        <EditProfile />
      </div>
      <Footer />
    </div>
  );
}

export default EditPages;
