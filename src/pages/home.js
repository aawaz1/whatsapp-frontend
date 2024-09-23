import { useDispatch, useSelector } from "react-redux"
import { Sidebar } from "../components/sidebar"
import { useEffect, useState } from "react";
import {getConversations, updateMessagesAndConversations} from '../features/chatSlice.js'
import { ChatContainer, WhatsappHome } from "../components/Chat/index.js";
import SocketContext from '../context/socketContext.jsx'


function Home({socket}){
  const dispatch = useDispatch();
  const [typing ,setTyping] = useState(false)
  const [onlineUsers, setOnlineUsers] = useState([]);
  const {user} = useSelector(state => state.user);
  const {activeConversation} = useSelector(state => state.chat);

  // join user into the socket

  useEffect(() => {
    socket.emit('join' , user?._id);
  } , [user]);


  // get online users
  socket.on("get-online-users" , (users) => {
   
    setOnlineUsers(users);


  },[user])

 
  
// get conversations
  useEffect(() => {
    if(user?.token){
      dispatch(getConversations(user.token))

    }

  },[]);


  // listening to recieve message
useEffect(() => {
  const handleMessage = (msg) => {
    dispatch(updateMessagesAndConversations(msg));
  };

  const handleTyping = (conversation) => setTyping(conversation);
  const handleStopTyping = () => setTyping(false);

  // Setting up event listeners
  socket.on("receive message", handleMessage);
  socket.on("typing", handleTyping);
  socket.on("stop typing", handleStopTyping);

  // Cleanup function to remove event listeners
  return () => {
    socket.off("receive message", handleMessage);
    socket.off("typing", handleTyping);
    socket.off("stop typing", handleStopTyping);
  };
}, []); // Add dependencies if required


  
  

  return (
    <div  className="h-screen  dark:bg-dark_bg_1 flex items-center justify-center overflow-hidden">
      {/* container */}
      <div className="container  py-[19px] h-screen flex">
        {/* Sidebar */}
       <Sidebar onlineUsers={onlineUsers} typing={typing}/>
       {
        activeConversation._id ? <ChatContainer onlineUsers={onlineUsers} typing={typing}/> : <WhatsappHome/>
       }
      </div>

    </div>
  )
}
 const HomewithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <Home  {...props} socket={socket}/>}

  </SocketContext.Consumer>
  

 )



 export default HomewithSocket;