import { useSelector } from "react-redux"
import Message from "./Message";
import { useEffect, useRef } from "react";
import Typing from "./Typing";

export default function ChatMessages({typing}) {
    console.log(typing , "111111111111111typing")
    const {messages ,activeConversation} = useSelector((state) => state.chat);
  
    const {user} = useSelector((state) => state.user);
    console.log(user);
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
                            <Message message={message} me={user?._id === message?.sender?._id} key={message?._id}/>
                           

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
