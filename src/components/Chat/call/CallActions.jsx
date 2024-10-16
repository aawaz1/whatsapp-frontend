import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { ArrowIcon, MuteIcon } from "../../../svg";
import { IoMdVideocam } from "react-icons/io";
import { MdDialpad } from "react-icons/md";
import { ImVolumeMute2 } from "react-icons/im";
import { MdDialerSip } from "react-icons/md";


export default function CallActions() {
  return (
    <div className="h-22 w-full absolute bottom-0 z-40  px-1">
        {/* Container */}
        <div className="relative bg-[#222]  px-4 pt-6 pb-12 rounded-xl">
            {/* expand icon */}
            <button className="-rotate-90 scale y-[300%] absolute top-1 left-1/2">
                <ArrowIcon className='fill-dark_svg_2'/>
            </button>
            {/*Actions  */}
            <ul className="flex items-center justify-between">
          
                <li>
                    <button className="btn_secondary">
                        <HiOutlineSpeakerWave className="fill-white w-40" />
                    </button>
                </li>
                <li>
                    <button className="btn_secondary">
                        <IoMdVideocam className="fill-white w-6 "  />
                    </button>
                </li>
              
                <li>
                    <button className="btn_secondary">
                        <ImVolumeMute2 className="fill-white"/>
                    </button>
                </li>
                <li>
                    <button className="btn_secondary bg-red-600 rotate-[135deg]">
                        <MdDialerSip className="fill-white w-5"/>
                    </button>
                </li>
            </ul>
        </div>
    </div>
  )
}
