import { Logo } from "../../../svg";

export default function WhatsappHome() {
  return (
    <div className="h-[100vh] hidden md:block w-full dark:bg-dark_bg_4 select-none border-1 dark:border-1-dark_border_1 border-b-[6px] border-b-green_2">
        
        {/* Contianer */}
        <div className="-mt-1.5 w-full h-full flex flex-col gap-y-8 items-center justify-center">
            <span>
                <Logo/>
            </span>
            {/* Infos */}
            <div className="mt-5 text-center space-y-[12px]">
                <h1 className="text-[32px] dark:text-dark_text_4 font-extralight">
                    Whatsapp Web
                </h1>
                <p className="text-sm dark:text-dark_text_3">
                    Send and recieve messages without keeping your phone online.<br/>
                    Use whatsapp on up to 4 linked devices and 1 phone at the same time.
                </p>
            </div>

        </div>
        


    </div>
  )
}
