import Footer from "../../components/Blocks/Footer/Footer";
import Messenger from "../../components/Messenger/Messenger";
import "./MainMessenger.css";
import socketIOClient from "socket.io-client";

function MainMessenger() {
  const socket = socketIOClient.connect('http://localhost:5000');
  return (
    <div className="content">
      <div className="wrapper">
        <Messenger socket={socket} />
      </div>
      <Footer />
    </div>
  );
}

export default MainMessenger;