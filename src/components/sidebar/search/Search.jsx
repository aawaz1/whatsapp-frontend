import { useState } from "react"
import { ReturnIcon } from "../../../svg";

function Search({searchResult}) {
    const [show ,setShow] = useState("");
  return (
    <div className="h-[49px] py-1.5">
        {/* container */}
        <div className="px-[10px]">
            {/* search input container */}
            <div className="flex items-center gap-x-2">
                <div className="w-full dark:bg-dark_bg_2 pl-2 rounded-lg">
                    {show || searchResult == 0 ? (<span className="w-8 flex items-center justify-center rotateAnimation">
                        <ReturnIcon className="fill-green_1 w-5"/>
                    </span>): "search"}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Search