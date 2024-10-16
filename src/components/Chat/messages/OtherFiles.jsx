import PDF from '../preview/files/files/PDF.webp'
import TXT from '../preview/files/files/TXT.webp'
import PPTX from '../preview/files/files/PPTX.webp'
import DOCX from '../preview/files/files/DOCX.webp';
import { MdDownload } from "react-icons/md";
export default function OtherFiles({file , type}) {
    console.log(file?.public_id , "publcbfduibfd")
    const fileTypeToImage = (type) => {
        switch (type) {
            case 'PDF':
                return PDF;
            case 'TXT':
                return TXT;
            case 'PPTX':
                return PPTX;
            default:
                return DOCX;
        }
    };
  return (
    <div className="bg-green_4 p-2">
        {/* Container */}
        <div className="flex items-center justify-between gap-x-8">
            {/* File Infos */}
            <div className="flex items-center gap-2">
                <img className='w-20 h-15' alt={type} src={fileTypeToImage(type)}/>
                <div className="flex-flex-col gap-2 ">
                    <h1 className=''>{file.orginal_filename}.{file.public_id}</h1>
                    <span className='text-sm'>
                        {type} . {(file.bytes)}B
                    </span>
                </div>
            </div>
            {/* Download Button */}
            <a href={file.secure_url} target='_blank' download>
               <MdDownload className='' fontSize={30}/>
            </a>
        </div>
    </div>
  )
}
