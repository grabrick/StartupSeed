import { useEffect } from "react";
import Footer from "../../components/Blocks/Footer/Footer";
import Messenger from "../../components/Messenger/Messenger";
import "./MainMessenger.css";
import socketIOClient from "socket.io-client";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux'
import { getCatalog } from "../../redux/slices/messengerSlice";

function MainMessenger() {
  // const socket = socketIOClient.connect('http://localhost:5000');
  const catalog = useSelector((state) => state.messenger.catalog)
  const dispatch = useDispatch()
  const ID = JSON.parse(localStorage.getItem("userData"));
  const userId = ID.userID;
  const socket = '123'

  useEffect(() => {
    axios.get(`/api/${userId}/getCatalog`)
      .then(res => {
        // console.log(res.data.findObject);
        dispatch(getCatalog(res.data.findObject))
      })
  }, [])
  return (
    <div className="content">
      <div className="wrapper">
        <Messenger socket={socket} catalogItems={catalog} />
      </div>
      <Footer />
    </div>
  );
}

export default MainMessenger;