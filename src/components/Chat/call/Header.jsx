import { ArrowIcon, LockIcon } from "../../../svg";
import { IoMdPersonAdd } from "react-icons/io";


export default function Header() {
  return (
    <header className="absolute top-0 w-full z-40">
        <div className="p-1 flex items-center justify-between">
            {/* Return Buttons */}
            <button className="btn">
                <span className="rotate-180 scale-150">
                    <ArrowIcon className='fill-white'/>
                </span>

            </button>
            {/* end to end encrypted text */}
            <p className="flex items-center">
                <LockIcon className='fill-white scale-75'/>
                <span className="text-xs text-white"> end to end encrypted text</span>
            </p>
            {/* add contact to call */}
            <button className="btn">
                <IoMdPersonAdd className="text-white"/>
            </button>
        </div>

    </header>
  )
}
