import { dateHandler } from '../../../utils/date.utils'
import { useDispatch, useSelector } from 'react-redux'
import { open_create_conversation } from '../../../features/chatSlice';
import { getConversationId } from '../../../utils/chat.utils';
import SocketContext from '../../../context/socketContext';
function Contact({contact , setSearchResults ,socket}){
  
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.user);
    const {token} = user;
  
    
    const values = {
        receiver_id : contact._id,
        token
    }
    const openConversation = async() => {
        let newConvo = await  dispatch(open_create_conversation(values));
          socket.emit('join conversation' ,newConvo?.payload?._id);
          setSearchResults([]);
  
      }
  return (
    <li onClick={() => openConversation()} className="list-none  h-[72px] w-full   dark:bg-dark_bg_1 hover:dark:bg-dark_bg_2 cursor-pointer dark:text-dark_text_1 px-[10px]">
        {/* Container */}
        <div className="relative flex justify-between items-center w-full py-[10px]">
            {/* Left */}
            <div className="flex items-center gap-x-3">
                {/* Conversation User Picture */}
                <div className="relative max-w-[50px] min-w-[50px] h-[50px] rounded-full overflow-hidden">
                    <img src={contact.picture} alt={contact.name} className="w-full h-full object-cover"/>

                </div>
                {/* Conversation  name and  message */}
                <div className="w-full flex flex-col">
                    {/* Conversation name */}
                    <h1 className="font-bold text-white flex items-center gap-x-2">
                        {
                            contact?.name
                        }
                    </h1>
                    {/* Conversation message */}
                    <div>
                        <div className="flex items-center gap-x-1 dark:text-dark_text_2 ">
                            <div className="flex-1 items-center gap-x-1 dark:text-dark_text_2">
                                <p>{contact?.status}</p>
                            </div>
                        </div>
                    </div>


                </div>

            </div>
            {/* Right */}
            {/* <div className="flex flex-col gap-y-4 items-end text-xs">
                <span className="dark:text-dark_text_2">
                    {dateHandler(contact.latestMessage?.createdAt)}

                </span>
              

            </div> */}

        </div>
        {/* Border */}
        <div className="ml-16 border-b dark:border-b-dark_border_1"></div>
  

    </li>
  )
}


const ContactWithContext = (props) => (
    <SocketContext.Consumer>
        {
            (socket) => (<Contact {...props} socket={socket}/>)
        }

    </SocketContext.Consumer>

    )


export default ContactWithContext;