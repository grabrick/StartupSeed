import Footer from "../../components/UI/Blocks/Footer/Footer";
import Messenger from "../../components/Messenger/Messenger";
import "./MainMessenger.css";

function MainMessenger({isAdmin}) {
  return (
    <div className="content">
      <div className="wrapper">
        <Messenger isAdmin={isAdmin} />
      </div>
      <Footer />
    </div>
  );
}

export default MainMessenger;
