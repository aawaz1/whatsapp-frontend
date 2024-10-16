import { AttachmentIcon, SendIcon } from "../../../svg";
import EmojiPickerApp from "./EmojiPicker";
import Input from "./Input";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessages } from "../../../features/chatSlice";
import {ClipLoader} from  'react-spinners'
import { Attachments } from "./attachements";
import SocketContext from "../../../context/socketContext";

function ChatActions({socket}) {
    const dispatch = useDispatch();
    const [loading ,setLoading] = useState(false);
    const [showPicker ,setShowPicker] = useState(false);
    const [showAttachments ,setShowAttachments] = useState(false);
    const [message ,setMessage] = useState("");
    const textRef = useRef();
    const {activeConversation , status} = useSelector(state => state.chat);
    const {user} = useSelector(state => state.user);
    const {token} = user;
    const values = {
        message ,
        convo_id : activeConversation?._id,
        files : [],
        token ,



    }
    const sendMessageHandler = async(e) => {
        e.preventDefault();
        setLoading(true);
       let newMsg =  await dispatch(sendMessages(values));
       socket.emit("send message", newMsg.payload)
        setLoading(false);
        setMessage("");
        

    }
  return (
    <form  onSubmit={(e) => sendMessageHandler(e)} className=" dark:bg-dark_bg_2 h-[60px] w-full flex items-center absolute bottom-0z py-2 select-none">
        {/* Container */}
        <div className="flex w-full items-center gap-x-2">
            {/* Emojis and Attachments */}
            <ul className="flex gap-x-2">
                <EmojiPickerApp setShowAttachments={setShowAttachments} setShowPicker={setShowPicker} showPicker={showPicker} textRef={textRef} message={message} setMessage={setMessage}/>
                <Attachments setShowPicker={setShowPicker} showAttachments={showAttachments} setShowAttachments={setShowAttachments} />

            </ul>
            {/* Input */}
            <Input message={message} textRef={textRef} setMessage={setMessage}/> 
            {/* Send Button */}
            <button type="submit" className="btn">
                {
                    status === "loading" && loading ? <ClipLoader color="#E9EDEF" size={25}/>
              : <SendIcon className="dark:fill-dark_svg_1"/>  }
                
            </button>
        </div>
    </form>
  )
}


const ChatActionsWithSocket = (props) => (
    <SocketContext.Consumer>
        {(socket) => <ChatActions {...props} socket={socket}/>}
    </SocketContext.Consumer>
)


export default ChatActionsWithSocket;
