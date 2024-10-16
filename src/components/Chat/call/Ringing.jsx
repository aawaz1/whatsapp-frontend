import { CloseIcon } from "../../../svg";
import { FaCheck } from "react-icons/fa";
import audio from './ringtone/ring.mp3'
import { useEffect, useState } from "react";

export default function Ringing({call ,setCall ,answerCall}) {
    const {recievingCall , callEnded ,name ,picture} = call;
    const [timer ,setTimer] = useState(0);
    let interval
    const handleTimer = () => {
       interval = setInterval(() => {
            setTimer((prev) => prev +1)

        }, (1000))
    }

    useEffect(() => {
        if(timer < 5){
            handleTimer();

        }else{
            setCall({...call , recievingCall : false})
        }

        return () => clearInterval(interval)

    }, [timer])
  return (
    <div className="dark:bg-dark_bg_1 w-full  rounded-lg fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg z-30">
        {/* Container */}
        <div className="flex p-4  justify-between items-center gap-x-8">
            {/* Call Info */}
            <div className="flex items-center gap-x-2">
                <img src={picture} alt={`caller profile picture`} className="w-28 h-28 rounded-full p-1"/>
                <div className="">
                    <h1 className="dark:text-white">
                        <b>{name}</b>

                    </h1>
                    <span className="dark:text-dark_text_2">whatsapp video....</span>
                </div>
            </div>
            {/* Call Actions */}
            <ul className="flex items-center gap-x-2">
                <li>
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500">
                        <CloseIcon className="fill-white w-5"/>
                    </button>
                </li>
                <li onClick={answerCall}>
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500">
                        <FaCheck className="fill-white w-5"/>
                    </button>
                </li>
                
            </ul>
        </div>

        {/* Ringtones */}
        <audio src={audio} autoPlay loop></audio>
    </div>
  )
}
