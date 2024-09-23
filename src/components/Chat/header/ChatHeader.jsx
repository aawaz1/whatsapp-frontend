import { useSelector } from "react-redux";
import { DotsIcon, SearchLargeIcon } from "../../../svg";
import { Capitalize } from "../../../utils/string.utils";


const ChatHeader = ({online}) => {
    console.log(online);
    const {activeConversation} = useSelector(state => state.chat);
    const {name, picture} = activeConversation;
  return (
    <div className="h-[59px]  dark:bg-dark_bg_2 flex items-center p16 select-none">
        {/* Container */}
        <div className="w-full flex items-center justify-between">
            {/* Left */}
            <div className="flex items-center gap-x-4">
                {/* Conversation Image */}
                <button className="btn !min-w-[40px] !max-w-[40px]">
                    <img src={picture} alt={`${name} picture`} className="w-full h-full rounded-full object-cover"/>
                </button>
                {/* Conversation Name and Online Status */}
                <div className="flex flex-col">
                    <h1 className="dark:text-white text-white text-md font-bold">
                        {Capitalize(name.split(" ")[0])}
                    </h1>
                    <span className="text-xs dark:text-dark_svg_2">{online ? "online" : ""}</span>
                </div>
            </div>
            {/* Right */}
            <ul className="flex items-center gap-x-2.5">
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