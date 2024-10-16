import { useSelector } from "react-redux"
import Message from "./Message";
import { useEffect, useRef } from "react";
import Typing from "./Typing";
import FileMessage from "./FileMessage";

export default function ChatMessages({typing}) {
   
    const {messages ,activeConversation} = useSelector((state) => state.chat);
    console.log(messages.files , "heeeeelooooooooooooo");
  
    const {user} = useSelector((state) => state.user);
 
    const endRef = useRef();

    useEffect(() => {
        scrollToBottom();
     
    },[messages]);

    const scrollToBottom = () => {
        endRef.current.scrollIntoView({behaviour : "smooth"})
    }

  return (
    <div className="flex items-centers h-full bg-[url('https://wallpaperaccess.com/full/7331554.jpg')] bg-cover bg-no-repeat">
        {/* Container */}
        <div className="scrollbar overflow_scrollbar overflow-auto w-full py-2 px-[6%]">
            {/* Messages */}
            <div className="flex-items-center ">
                {
                    messages && messages?.map(message => {
                        return (
                            <>
                            {/* Message files */}
                            {
                                message?.files?.length > 0 ? message.files.map((file) => <FileMessage
                                FileMessage={file}
                                message={message}
                                key={message._id} 
                                me={user?._id === message?.sender?._id}
                                />)  : null
                            }
                            {/* Messages Text */}
                           
                          {
                          
                            message.message.length > 0 ?  <Message message={message} me={user?._id === message?.sender?._id} key={message?._id}/> : null
                          }
                           </>
                           

                        )
                    })
                }
                {typing===activeConversation._id ? <Typing/>  : ""}
                <div ref={endRef} className="mt-2">

                </div>
            </div>
        </div>
    </div>
  )
}
