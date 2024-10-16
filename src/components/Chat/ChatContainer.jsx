import { useDispatch, useSelector } from "react-redux";
import ChatHeader from "./header/ChatHeader";
import ChatMessages from "./messages/ChatMessages";
import { useEffect } from "react";
import { getConversationsMessages } from "../../features/chatSlice";
import { ChatActions } from "./action";
import { checkOnlineStatus, getConversationId } from "../../utils/chat.utils";
import FilesPreview from "./preview/files/FilesPreview";

export default function ChatContainer({onlineUsers,setShow ,callUser,typing}){
  

  const dispatch = useDispatch();
  const { activeConversation, messages } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  const {files} = useSelector((state) => state.chat);
  console.log(files , "filessssssssssssssssss");
  const { token } = user;
  const values = {
    token,
    convo_id: activeConversation._id
  };

 
 

  useEffect(() => {
    if (activeConversation?._id) {
      dispatch(getConversationsMessages(values));
      // Construct the values object here, inside the useEffect
    
      
      // Dispatch the action to fetch conversation messages
   
    }
  }, [activeConversation, token, dispatch]);


  return (
    <div className="relative  w-full h-full border-1 dark:border-1-dark_border_2 select-none overflow-hidden">
      {/* Container */}
      <div>
        {/* Chat Header */}
        <ChatHeader setShow={setShow} callUser={callUser} online={checkOnlineStatus(onlineUsers ,user ,activeConversation.users)}/>
    {
      files.length > 0 ? (<FilesPreview/>) : (  <>
        {/* Chat Message */}
        <ChatMessages typing={typing}/>
        {/* Chat Actions */}
        <ChatActions />
      </>)
    }
      </div>
    </div>
  );
}
