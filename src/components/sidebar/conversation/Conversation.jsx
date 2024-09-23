import moment from 'moment'
import { dateHandler } from '../../../utils/date.utils'
import { useDispatch, useSelector } from 'react-redux'
import { open_create_conversation } from '../../../features/chatSlice';
import { getConversationId, getConversationName, getConversationPicture } from '../../../utils/chat.utils';
import { Capitalize } from '../../../utils/string.utils';
import { Socket } from 'socket.io-client';
import SocketContext from '../../../context/socketContext';
 function Conversation({convo , socket , online ,typing})  {
    console.log("onlineeeeeee" , online)
    console.log(convo , '@222222222222222')
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.user);
    const {activeConversation} = useSelector(state => state.chat);
    const {token} = user;
  
    
    const values = {
        receiver_id : getConversationId(user , convo.users),
        token
    }
    const openConversation = async() => {
      let newConvo = await  dispatch(open_create_conversation(values));
        socket.emit('join conversation' ,newConvo?.payload?._id)

    }
    console.log(convo._id , "convoooooooooooooooooo");
    console.log(convo , "nameeeeeeeeeeeeee");
    console.log(activeConversation._id , "activeeeeeeeeeeeeeee")
  return (
    <li onClick={() => openConversation()} className={`list-none h-[72px] w-full  bg-red-500 dark:bg-dark_bg_1 hover:${convo._id === activeConversation._id ? "" : "dark:bg-dark_bg_2"} cursor-pointer dark:text-dark_text_1 px-[10px] ${convo._id === activeConversation._id ? "dark:bg-dark_hover_1" : null}`}>
        {/* Container */}
        <div className="relative flex justify-between items-center w-full py-[10px]">
            {/* Left */}
            <div className="flex items-center gap-x-3">
                {/* Conversation User Picture */}
                <div className={`relative ${online ? 'online' : ""} max-w-[50px] min-w-[50px] h-[50px] rounded-full overflow-hidden`}>
                    <img src={getConversationPicture(user , convo.users)} alt={(getConversationName(user, convo.users))} className="w-full h-full object-cover"/>

                </div>
                {/* Conversation  name and  message */}
                <div className="w-full flex flex-col">
                    {/* Conversation name */}
                    <h1 className="font-bold flex items-center gap-x-2">
                        {
                            Capitalize(getConversationName(user, convo.users))
                        }
                    </h1>
                    {/* Conversation message */}
                    <div>
                        <div className="flex items-center gap-x-1 dark:text-dark_text_2 ">
                            <div className="flex-1 items-center gap-x-1 dark:text-dark_text_2">
                                {
                                    typing === convo?._id ? (<p className='text-green_1'>Typing..</p>) : (  <p>{convo?.latestMessage?.message?.length > 25 ? `${convo?.latestMessage?.message.substring(0,25)}...` : convo?.latestMessage?.message}</p>)
                                }
                              
                            </div>
                        </div>
                    </div>


                </div>

            </div>
            {/* Right */}
            <div className="flex flex-col gap-y-4 items-end text-xs">
                <span className="dark:text-dark_text_2">
                    {convo.latestMessage?.createdAt ? dateHandler(convo.latestMessage?.createdAt) : ""}

                </span>
              

            </div>

        </div>
        {/* Border */}
        <div className="ml-16 border-b dark:border-b-dark_border_1"></div>
  

    </li>
  )
}


const ConversationWithContext = (props) => (
    <SocketContext.Consumer>
        {
            (socket) => (<Conversation {...props} socket={socket}/>)
        }

    </SocketContext.Consumer>

    )


export default ConversationWithContext;