import moment from "moment";
import FileImageVideo from "./FileImageVideo";
import OtherFiles from "./OtherFiles";


export default function FileMessage({FileMessage,message ,me}) {
    const {file,type} = FileMessage;
  return (
    <div className={`w-full  flex mt-2 space-x-3 max-w-xs ${me ? "ml-auto justify-end " : ""}`}>
        {/* Message Container */}
        <div className={`relative  h-full dark:text-dark_text_1 p-2 rounded-lg  ${me ? "border-[3px]  border-green_3" : "dark:bg-dark_bg_2"} ${me && file.public_id.split(".")[1]=== "png" ? "bg-white" : "bg-green_3 p-1"}`}>
            {/* Messages */}
         <p className={`h-full text-sm ${type !== "IMAGE" && type !== "VIDEO" ? "pb-5" : null}`}>
            {
                type === 'IMAGE' || type === 'VIDEO' ? (<FileImageVideo url={file.secure_url} type={type}/>) : (<OtherFiles file={file} type={type}/>)
            }
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
