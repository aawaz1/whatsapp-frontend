import { ArrowIcon, CloseIcon, NotificationIcon } from "../../../svg"

function Notification() {
  return (
    <div className="flex justify-center items-center h-[90px] dark:bg-dark_bg_3 p-[13px]">
        {/* Container */}
        <div className="w-full flex justify-between items-center">
            {/* left */}
            <div className="flex items-center gap-x-4">
                <div className="cursor-pointer">
                <NotificationIcon className="dark:fill-blue_1 "/></div>
                <div className="flex flex-col">
                    <span className="textPrimary">Get Notified of New Messages</span>
                    <span className="textSecondary mt-0.5 flex items-center gap-0.5">Turn on desktop notification
                        <ArrowIcon className="dark:fill-dark_svg_2 mt-1"/>
                    </span>
                </div>
            </div>
            {/* right */}
            <div className="cursor-pointer">
                <CloseIcon className="dark:fill-dark_svg_2"/>
            </div>
        </div>
        
    </div>
  )
}

export default Notification