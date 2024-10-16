import { useSelector } from "react-redux"
import  Conversation  from "./Conversation";
import { setActiveConversations } from "../../../features/chatSlice";
import { checkOnlineStatus, getConversationId } from "../../../utils/chat.utils";

const Conversations = ({onlineUsers ,typing}) => {
    const {conversations ,activeConversation} = useSelector(state => state.chat);
    const {user} = useSelector(state => state.user);
   
 
  return (
      <div className="convos scrollbar">
        <ul>
      
         
          
        {
            conversations && conversations?.filter((c) => c.latestMessage || c._id=== activeConversation._id || c.isGroup == true)
            ?.map((convo) =>  {
              let check = checkOnlineStatus(onlineUsers,user ,convo.users)
           return <Conversation typing={typing} convo={convo} key={convo._id} online={check ? true :false}/>}
            
               
            )
        }
</ul>
      </div>
  )
}

export default Conversations