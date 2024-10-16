import { useState } from "react";
import FileViewer from "./FileViewer";
import Header from "./Header";
import Input from "./Input";
import SendAndUpdate from "./SendAndUpdate";

export default function FilesPreview() {
    const [message ,setMessage] = useState("");
    const [activeIndex ,setActiveIndex] = useState(0)
    console.log("message ===========>" , message)
  return (
    <div className="relative py-2 w-full flex items-center justify-center">
        {/* Container */}
        <div className="flex w-full flex-col gap-2 justify-center items-center">
            {/* Header */}
            <Header activeIndex={activeIndex}/>
            {/* Viewing Selected Files */}
            <FileViewer activeIndex={activeIndex}/>
            <div className="w-full flex  flex-col items-center">
                {/* Message Input */}
                <Input message={message} setMessage={setMessage}/>
                {/* Send  and Update Files */}
                <SendAndUpdate message={message} activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>

            </div>

        </div>
    </div>
  )
}
