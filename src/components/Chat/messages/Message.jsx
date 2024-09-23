import moment from "moment";

export default function Message({message , me}) {
  console.log(me ,"meeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
    
  return (
    <div className={`w-full  flex mt-2 space-x-3 max-w-xs ${me ? "ml-auto justify-end " : ""}`}>
        {/* Message Container */}
        <div className={`relative  h-full dark:text-dark_text_1 p-2 rounded-lg  ${me ? "bg-green_3" : "dark:bg-dark_bg_2"}`}>
            {/* Messages */}
         <p className="float-left h-full text-sm pb-5">
            {message?.message}
         </p>
         {/* Message Date */}
         <span className="text-xs pt-6 float-right text-dark_text_5">{moment(message?.createdAt)?.format("HH:mm")}</span>
         {/* triangle */}
         {/* <span>
        <TriangleIcon className="dark:fill-dark_bg_2 "/>
         </span> */}
        </div>
    </div>
  )
}
