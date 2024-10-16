import { useDispatch, useSelector } from "react-redux";
import { CloseIcon } from "../../../../svg";
import { removeFiles } from "../../../../features/chatSlice";


export default function Header({activeIndex}) {
    const dispatch = useDispatch();
    const {files} = useSelector((state) => state.chat);

    const clearFilesHandler = () => {
        dispatch(removeFiles());

    }
  return (
    <div className="w-full">
        {/* container */}
        <div className="w-full translate-x-4 flex items-center justify-between">
            {/* Close Icons */}
            <div onClick={() =>clearFilesHandler()} className="cursor-pointer">
                <CloseIcon className="dark:fill-dark_svg_1"/>
            </div>
            {/* File Name */}
            <h1 className="dark:text-dark_text_1 text-[15px]">
                {files[activeIndex]?.file.name}
            </h1>
            {/* Empty */}
            <span></span>

        </div>
    </div>
  )
}
