import moment from "moment";
import { BeatLoader } from "react-spinners";

export default function Typing({message}) {

    
  return (
    <div className={`w-full   flex mt-2 space-x-3 max-w-xs`}>
      
        {/* Message Container */}
        <div className={`relative  h-full dark:bg-dark_bg_2 dark:text-dark_text_1 p-2 rounded-lg`}>
     
        

         {/* Typing Animation */}
         <BeatLoader color="#fff" size={10}/>
         {/* triangle */}
         {/* <span>
        <TriangleIcon className="dark:fill-dark_bg_2 "/>
         </span> */}
        </div>
    </div>
  )
}
