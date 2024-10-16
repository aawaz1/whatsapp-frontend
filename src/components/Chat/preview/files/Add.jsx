import { useRef } from "react";
import { CloseIcon } from "../../../../svg";
import { useDispatch } from "react-redux";
import getFileType from "../../../../utils/file.utils";
import { addFiles } from "../../../../features/chatSlice";

export default function Add() {
    const dispatch = useDispatch();
    const inputRef = useRef(null);

    const filesHandler = (e) => {
        let files = Array.from(e.target.files);

        console.log("Selected files:", files); // Debug log

        files.forEach((file) => {
            console.log("Processing file:", file.name, "Type:", file.type, "Size:", file.size); // Debug log

            // Correct MIME type validation
            if (
                file.type !== "application/pdf" &&
                file.type !== "text/plain" &&
                file.type !== "application/msword" &&
                file.type !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document" &&
                file.type !== "application/vnd.openxmlformats-officedocument.presentationml.presentation" &&
                file.type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&
                file.type !== "application/vnd.ms-powerpoint" &&
                file.type !== "application/zip" &&
                file.type !== "application/vnd.rar"
                &&
                file.type !== "image/gif" &&
                file.type !== "image/png" &&
                file.type !== "image/jpeg" &&
                file.type !== "image/webp"
                &&
                file.type !== "video/mp4" &&
                file.type !== "video/mpe4" &&
                file.type !== "image/webm"
            ) {
                console.log("Filtered out due to unsupported type:", file.type); // Debug log
                return; // Skip the file
            } else if (file.size > 1024 * 1024 * 10) {
                console.log("Filtered out due to size:", file.size); // Debug log
                return; // Skip the file
            } else {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = (e) => {
                    console.log("File read successfully:", file.name); // Debug log
                    dispatch(addFiles({ file: file, fileData:getFileType(file.type) === "IMAGE" ? e.target.result : "", type: getFileType(file.type) }));
                };
                reader.onerror = (e) => {
                    console.error("File reading error:", e); // Error log
                };
            }
        });
    };

    return (
        <>
            <div
                onClick={() => inputRef.current.click()}
                className="w-14 h-14 mt-2 border rounded-md flex items-center justify-center cursor-pointer dark:border-white"
            >
                <span className="rotate-45">
                    <CloseIcon className="dark:fill-dark_svg_1" />
                </span>
            </div>
            <input
                type="file"
                accept="application/*, text/plain, image/jpeg, image/webp, image/png, image/gif, video/mp4, video/mpeg"
                hidden
                ref={inputRef}
                onChange={filesHandler}
            />
        </>
    );
}
