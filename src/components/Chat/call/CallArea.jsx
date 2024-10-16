import { Capitalize } from "../../../utils/string.utils";


export default function CallArea({name}) {
  return (
    <div className="absolute z-40 top-12 w-full p-1">
        {/* Container */}
    <div className="flex flex-col items-center">
        {/* Call Info */}
        <div className="flex flex-col items-center gap-y-1">
            <h1 className="text-white text-lg">
                <b>{name ? Capitalize(name) : null}</b>
            </h1>
            <span className="text-dark_text_1">
                Ringing...

            </span>
           

        </div>
    </div>
    </div>
  )
}
