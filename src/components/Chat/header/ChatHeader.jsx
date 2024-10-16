import { useSelector } from "react-redux";
import { CallIcon, DotsIcon, SearchLargeIcon } from "../../../svg";
import { Capitalize } from "../../../utils/string.utils";
import { MdVideoCall } from "react-icons/md";
import { getConversationName, getConversationPicture } from "../../../utils/chat.utils";


const ChatHeader = ({online ,callUser ,setShow}) => {
  
    const {activeConversation} = useSelector(state => state.chat);
    const {user} = useSelector(state => state.user)
    console.log(activeConversation, "acitveeeeeee")
    const {name, picture} = activeConversation;
  return (
    <div className="h-[59px]  dark:bg-dark_bg_2 flex items-center p16 select-none">
        {/* Container */}
        <div className="w-full flex items-center justify-between">
            {/* Left */}
            <div className="flex items-center gap-x-4">
                {/* Conversation Image */}
                <button className="btn !min-w-[40px] !max-w-[40px]">
                    <img src={getConversationPicture(user ,activeConversation.users)} alt={`${Capitalize(getConversationName(user, activeConversation?.users))?.split( " ")?.[0]}
 picture`} className="w-full h-full rounded-full object-cover"/>
                </button>
                {/* Conversation Name and Online Status */}
                <div className="flex flex-col">
                    <h1 className="dark:text-white text-white text-md font-bold">
                      {Capitalize(getConversationName(user, activeConversation.users))?.split( " ")?.[0]}
                      
                    </h1>
                    <span className="text-xs dark:text-dark_svg_2">{online ? "online" : ""}</span>
                </div>
            </div>
            {/* Right */}
            <ul className="flex items-center gap-x-2.5">
            <li onClick={() => callUser()} className="">
                    <button className="btn">
                        <MdVideoCall className="dark:fill-dark_svg_1 w-5"/>
                    </button>
                </li>
            <li className="">
                    <button className="btn">
                        <CallIcon className="dark:fill-dark_svg_1"/>
                    </button>
                </li>
            <li className="">
                    <button className="btn">
                        <SearchLargeIcon className="dark:fill-dark_svg_1"/>
                    </button>
                </li>
            <li className="">
                    <button className="btn">
                        <DotsIcon className="dark:fill-dark_svg_1"/>
                    </button>
                </li>

            </ul>

        </div>
    </div>
  )
}

export default ChatHeader