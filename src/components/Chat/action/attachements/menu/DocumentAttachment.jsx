import { useRef } from "react";
import { DocumentIcon } from "../../../../../svg";
import { addFiles } from "../../../../../features/chatSlice";
import { useDispatch } from "react-redux";
import getFileType from "../../../../../utils/file.utils";

export default function DocumentAttachment() {
    const inputRef = useRef(null);
    const dispatch = useDispatch();
    const documentHandler = (e) => {
        let files = Array.from(e.target.files);
        files.forEach((file) => {
            // Correct MIME type validation
            
            if (
                file.type !== "application/pdf" &&
                file.type !== "text/plain" &&
                file.type !== "application/msword" &&
                file.type !== "application/vnd.openxmlformats-officedocument.wordprocessingml.template" 
                &&
                file.type !== "application/vnd.ms-powerpoint" &&
                file.type !== "application/vnd.openxmlformats-officedocument.presentationml.presentation" &&
                file.type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.template"
                 &&
                file.type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                &&
                file.type !== "application/vnd.rar" &&
                file.type !== "application/zip"
                
            )  {
                files = files.filter((item) => item.name !== file.name);
                return;
            } else if (file.size > 1024 * 1024 * 10) { // File size validation
                files = files.filter((item) => item.name !== file.name);
                return;
            } else {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = (e) => {
                    dispatch(addFiles({ file: file, fileData: e.target.result, type: getFileType(file.type) }));
                };
            }
        });
    };
  return (
    <div>
          <li>
            <button type='button' onClick={() => inputRef.current.click()}  className=' bg-[#5F66CD] rounded-full'>
                <DocumentIcon/>
                <input
                    type="file"
                    accept="application/* text/plain"
                    hidden
                    ref={inputRef}
                    onChange={documentHandler}
                />

            </button>
        </li>
    </div>
  )
}
