import Footer from "../../components/Blocks/Footer/Footer";
import Messenger from "../../components/Messenger/Messenger";
import "./MainMessenger.css";

function MainMessenger() {
  return (
    <div className="content">
      <div className="wrapper">
        <Messenger />
      </div>
      <Footer />
    </div>
  );
}

export default MainMessenger;