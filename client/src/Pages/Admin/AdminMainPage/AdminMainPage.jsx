import Admins from "../../../components/Admins/Admins";
import Footer from "../../../components/UI/Blocks/Footer/Footer";
import ModifiedHeader from "../../../components/UI/Blocks/Header/ModifiedHeader/ModifiedHeader";
import './AdminMainPage.css'

function AdminPage({isAdmin}) {
  return (
    <div className="content">
      <ModifiedHeader isAdmin={isAdmin} />
      <div className="wrapper">
        <Admins />
      </div>
      <Footer />
    </div>
  );
}

export default AdminPage;
