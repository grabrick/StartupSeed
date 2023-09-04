import EditProfile from "../../components/EditProfile/EditProfile";
import Footer from "../../components/UI/Blocks/Footer/Footer";
import './EditPagesRoute.css'

function EditPages({isAdmin}) {
  return (
    <div className="content">
      <div className="wrapper">
        <EditProfile isAdmin={isAdmin} />
      </div>
      <Footer />
    </div>
  );
}

export default EditPages;
