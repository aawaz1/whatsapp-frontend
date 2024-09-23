import { useRef } from "react";
import { PhotoIcon, StickerIcon } from "../../../../../svg";
import { useDispatch, useSelector } from "react-redux";
import { addFiles } from "../../../../../features/chatSlice";
import getFileType from "../../../../../utils/file.utils";

const PhotoAttachment = () => {
    const dispatch = useDispatch();
    const inputRef = useRef(null);
    const {files} = useSelector(state => state.chat);
    console.log("files", files);

    const imageHandler = (e) => {
        let files = Array.from(e.target.files);
        files.forEach((file) => {
            // Correct MIME type validation
           if (
                file.type !== "image/gif" &&
                file.type !== "image/png" &&
                file.type !== "image/jpeg" &&
                file.type !== "image/webp"
                &&
                file.type !== "video/mp4" &&
                file.type !== "video/mpe4" &&
                file.type !== "image/webm"
            ){
                files = files.filter((item) => item.name !== file.name);
                return;
            } else if (file.size > 1024 * 1024 * 10) { // File size validation
                files = files.filter((item) => item.name !== file.name);
                return;
            } else {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = (e) => {
                    dispatch(addFiles({ file: file, fileData: e.target.result, type: getFileType(file.type)}));
                };
            }
        });
    };

    return (
        <li>
            <button
                type="button"
                onClick={() => inputRef.current.click()}
                className="rounded-full bg-[#BF59C5]"
            >
                <PhotoIcon />
                <input
                    type="file"
                    accept="image/jpeg,image/webp,image/png,image/gif video/mp4 , video/mpeg"
                    hidden
                    multiple
                    ref={inputRef}
                    onChange={imageHandler}
                />
            </button>
        </li>
    );
};

export default PhotoAttachment;
