import { useDispatch, useSelector } from "react-redux";
import ChatHeader from "./header/ChatHeader";
import ChatMessages from "./messages/ChatMessages";
import { useEffect } from "react";
import { getConversationsMessages } from "../../features/chatSlice";
import { ChatActions } from "./action";
import { checkOnlineStatus, getConversationId } from "../../utils/chat.utils";

export default function ChatContainer({onlineUsers ,typing}){
  console.log(onlineUsers , "chatcontainer");

  const dispatch = useDispatch();
  const { activeConversation, messages } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  const { token } = user;
  const values = {
    token,
    convo_id: activeConversation._id
  };

  console.log(activeConversation?._id , "aaaaaaaaaaaaa--------------");
 

  useEffect(() => {
    if (activeConversation?._id) {
      dispatch(getConversationsMessages(values));
      // Construct the values object here, inside the useEffect
    
      
      // Dispatch the action to fetch conversation messages
   
    }
  }, [activeConversation, token, dispatch]);

  console.log("messages", messages);

  return (
    <div className="relative  w-full h-full border-1 dark:border-1-dark_border_2 select-none overflow-hidden">
      {/* Container */}
      <div>
        {/* Chat Header */}
        <ChatHeader online={checkOnlineStatus(onlineUsers ,user ,activeConversation.users)}/>
        {/* Chat Message */}
        <ChatMessages typing={typing}/>
        {/* Chat Actions */}
        <ChatActions />
      </div>
    </div>
  );
}
