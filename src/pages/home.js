import { useDispatch, useSelector } from "react-redux";
import { Sidebar } from "../components/sidebar";
import { useEffect, useRef, useState } from "react";
import { getConversations, updateMessagesAndConversations } from "../features/chatSlice.js";
import { ChatContainer, WhatsappHome } from "../components/Chat/index.js";
import SocketContext from "../context/socketContext.jsx";
import Call from "../components/Chat/call/Call.jsx";
import { getConversationId, getConversationName, getConversationPicture } from "../utils/chat.utils.js";
import Peer from "simple-peer";

const callData = {
  socket_id: '',
  recievingCall: false,
  callEnded: false,
  name: "",
  picture: ""
};

function Home({ socket }) {
  const dispatch = useDispatch();
  const [typing, setTyping] = useState(false);
  const [show ,setShow] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { user } = useSelector(state => state.user);
  const { activeConversation } = useSelector(state => state.chat);

  // call
  const [call, setCall] = useState(callData);
  const [stream, setStream] = useState(null);
  const { recievingCall, callEnded, socket_id } = call;
  const [callAccepted, setCallAccepted] = useState(false);

  const myVideo = useRef(null);
  const userVideo = useRef(null);
  const connectionRef = useRef();

  // Media setup
  const SetUpMedia = () => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      setStream(stream);
      if (myVideo.current) {
        myVideo.current.srcObject = stream;
      }
    }).catch((error) => {
      console.error("Error accessing media devices.", error);
    });
  };

  const enableMedia = () => {
    if (myVideo.current && stream) {
      myVideo.current.srcObject = stream;
    } else {
      console.error('myVideo ref is not defined or stream is undefined');
    }
  };

  // call
  // useEffect(() => {
  //   SetUpMedia();

  //   socket.on("setup socket", (id) => {
  //     setCall({ ...call, socket_id: id });
  //   });

  //   socket.on("call user", (data) => {
  //     setCall({ 
  //       ...call, 
  //       socket_id: data.from, 
  //       name: data.name, 
  //       picture: data.picture, 
  //       signal: data.signal, 
  //       recievingCall: true 
  //     });
  //   });

  // }, [socket]);

  // const callUser = () => {
  //   setShow(true);
  //   enableMedia();
  //   setCall({
  //     ...call, 
  //     picture: getConversationPicture(user, activeConversation.users),
  //     name: getConversationName(user, activeConversation.users)
  //   });

  //   const peer = new Peer({
  //     initiator: true,
  //     trickle: false,
  //     stream: stream,
  //   });

  //   peer.on('signal', (data) => {
  //     socket.emit('call user', {
  //       userToCall: getConversationId(user, activeConversation.users),
  //       signal: data,
  //       from: socket_id,
  //       name: user.name,
  //       picture: user.picture
  //     });
  //   });

  //   peer.on('stream', (stream) => {
  //     if (userVideo.current) {
  //       userVideo.current.srcObject = stream;
  //     }
  //   });

  //   socket.on('call accepted', (signal) => {
  //     setCallAccepted(true);
  //     peer.signal(signal);
  //   });

  //   connectionRef.current = peer;
  // };

  // const answerCall = () => {
  //   enableMedia();
  //   setCallAccepted(true);

  //   const peer = new Peer({
  //     initiator: false,
  //     trickle: false,
  //     stream: stream,
  //   });

  //   peer.on('signal', (data) => {
  //     socket.emit("answer call", {
  //       signal: data,
  //       to: call.socket_id,
  //     });
  //   });

  //   peer.on('stream', (stream) => {
  //     if (userVideo.current) {
  //       userVideo.current.srcObject = stream;
  //     }
  //   });

  //   peer.signal(call.signal);
  //   connectionRef.current = peer;
  // };

  // join user into the socket
  useEffect(() => {
    socket.emit('join', user?._id);
  }, [socket, user]);

  // get online users
  useEffect(() => {
    socket.on("get-online-users", (users) => {
      setOnlineUsers(users);
    });
  }, [socket]);

  // get conversations
  useEffect(() => {
    if (user?.token) {
      dispatch(getConversations(user.token));
    }
  }, [user?.token, dispatch]);

  // listening to receive messages
  useEffect(() => {
    const handleMessage = (msg) => {
      dispatch(updateMessagesAndConversations(msg));
    };

    const handleTyping = (conversation) => setTyping(conversation);
    const handleStopTyping = () => setTyping(false);

    socket.on("receive message", handleMessage);
    socket.on("typing", handleTyping);
    socket.on("stop typing", handleStopTyping);

    return () => {
      socket.off("receive message", handleMessage);
      socket.off("typing", handleTyping);
      socket.off("stop typing", handleStopTyping);
    };
  }, [socket, dispatch]);

  return (
    <>
      <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center overflow-hidden">
        <div className="container py-[19px] h-screen flex flex-col md:flex-row">
          {/* Sidebar */}
          <Sidebar onlineUsers={onlineUsers} typing={typing} />
          {activeConversation._id
            ? <ChatContainer onlineUsers={onlineUsers} typing={typing} />
            : <WhatsappHome />}
        </div>
      </div>

      {/* Call */}
{/*   
        <Call
        show={show}
        call={call}
        setCall={setCall}
        stream={stream}
        callAccepted={callAccepted}
        userVideo={userVideo}
        myVideo={myVideo}
        answerCall={answerCall}
      /> */}
      
    </>
  );
}

const HomewithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <Home {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default HomewithSocket;
